import { Router, type IRouter } from "express";
import { db, eventInterestTable, nextEventTable } from "@workspace/db";
import { GetNextEventResponse, RegisterEventInterestBody, RegisterEventInterestResponse } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/next-event", async (_req, res): Promise<void> => {
  const [event] = await db.select().from(nextEventTable).where(eq(nextEventTable.id, 1));
  if (!event) {
    res.status(503).json({ error: "Event information is temporarily unavailable" });
    return;
  }

  // An old date should never make an event look upcoming after its day passes.
  const today = new Date().toISOString().slice(0, 10);
  const isPast = event.date !== null && event.date < today;
  const publicEvent = GetNextEventResponse.parse({
    title: event.title,
    date: isPast ? null : event.date,
    venue: isPast ? null : event.venue,
    details: event.details,
  });
  // Orval's Zod date parser produces a Date; return a calendar-only date as the API specifies.
  res.json({ ...publicEvent, date: publicEvent.date?.toISOString().slice(0, 10) ?? null });
});

router.post("/event-interest", async (req, res): Promise<void> => {
  const parsed = RegisterEventInterestBody.safeParse(req.body);
  if (!parsed.success || !parsed.data.name.trim() || !parsed.data.email.trim()) {
    res.status(400).json({ error: "Please enter a valid name and email address." });
    return;
  }

  await db.insert(eventInterestTable).values({
    name: parsed.data.name.trim(),
    email: parsed.data.email.trim(),
    volunteerTiming: parsed.data.volunteerTiming ?? null,
  });
  res.status(201).json(RegisterEventInterestResponse.parse({
    message: "Thank you — your interest has been registered. The next event details will be announced when confirmed.",
  }));
});

export default router;