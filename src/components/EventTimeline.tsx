'use client'

import { useState, useMemo } from 'react'

export interface Organizer {
  id?: string
  title: string
  color?: string
  customColor?: string
}

export interface Event {
  id: string
  title: string
  date: string
  endDate?: string
  location?: string
  shortDescription?: string
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  organizer?: Organizer
  cover?: { url?: string; alt?: string }
  tags?: string[]
}

interface EventTimelineProps {
  events: Event[]
  preview?: boolean
}

const statusMap: Record<string, { label: string; className: string }> = {
  upcoming: { label: 'Upcoming', className: 'badge-upcoming' },
  ongoing: { label: 'Ongoing', className: 'badge-ongoing' },
  completed: { label: 'Completed', className: 'badge-completed' },
  cancelled: { label: 'Cancelled', className: 'badge-cancelled' },
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatDayMonth(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
  })
}

/** Check if targetDate falls between event start date and end date */
function isEventActiveOnDate(event: Event, targetDate: Date): boolean {
  const start = new Date(event.date)
  start.setHours(0, 0, 0, 0)

  const end = event.endDate ? new Date(event.endDate) : new Date(event.date)
  end.setHours(23, 59, 59, 999)

  const check = new Date(targetDate)
  check.setHours(12, 0, 0, 0)

  return check >= start && check <= end
}

export default function EventTimeline({ events }: EventTimelineProps) {
  // Calendar month state (default to today or first event month)
  const initialDate = useMemo(() => {
    if (events.length > 0) {
      const firstUpcoming = events.find((e) => e.status === 'upcoming' || e.status === 'ongoing')
      if (firstUpcoming) return new Date(firstUpcoming.date)
    }
    return new Date()
  }, [events])

  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Generate Calendar Days for currentMonth
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDayIndex = new Date(year, month, 1).getDay() // 0 = Sun, 1 = Mon, ...
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days: Array<{ date: Date | null; isCurrentMonth: boolean }> = []

    // Empty padding cells for previous month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ date: null, isCurrentMonth: false })
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      })
    }

    return days
  }, [currentMonth])

  // Filter events based on selected date and status filter
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // Status filter
      if (statusFilter !== 'all' && e.status !== statusFilter) {
        return false
      }
      // Selected date filter
      if (selectedDate && !isEventActiveOnDate(e, selectedDate)) {
        return false
      }
      return true
    })
  }, [events, selectedDate, statusFilter])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* ── Left Panel: Interactive Calendar Widget (col-span-5) ── */}
      <div
        className="lg:col-span-5 card p-6 shadow-lg rounded-3xl sticky top-24"
        style={{ background: 'rgba(247, 244, 213, 0.95)', borderColor: 'rgba(15, 51, 10, 0.12)' }}
      >
        {/* Calendar Month Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-forest/10"
            style={{ color: 'var(--color-forest)' }}
            aria-label="Previous month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h3
            className="font-heading text-xl font-bold"
            style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
          >
            {currentMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
          </h3>

          <button
            onClick={nextMonth}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-forest/10"
            style={{ color: 'var(--color-forest)' }}
            aria-label="Next month"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 text-center font-heading text-xs font-semibold mb-2 opacity-60">
          {['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((cell, idx) => {
            if (!cell.date) {
              return <div key={`empty-${idx}`} className="h-11" />
            }

            const dayDate = cell.date
            const dayEvents = events.filter((e) => isEventActiveOnDate(e, dayDate))

            const isSelected =
              selectedDate &&
              selectedDate.getDate() === dayDate.getDate() &&
              selectedDate.getMonth() === dayDate.getMonth() &&
              selectedDate.getFullYear() === dayDate.getFullYear()

            const isToday =
              new Date().getDate() === dayDate.getDate() &&
              new Date().getMonth() === dayDate.getMonth() &&
              new Date().getFullYear() === dayDate.getFullYear()

            return (
              <button
                key={dayDate.toISOString()}
                onClick={() => {
                  if (isSelected) {
                    setSelectedDate(null) // toggle off
                  } else {
                    setSelectedDate(dayDate)
                  }
                }}
                className={`relative h-11 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'ring-2 ring-forest bg-teal text-cream shadow-md font-bold'
                    : isToday
                    ? 'bg-green/20 font-bold text-forest'
                    : 'hover:bg-forest/10 text-forest'
                }`}
              >
                <span className="text-sm leading-none">{dayDate.getDate()}</span>

                {/* Event Color Dots */}
                {dayEvents.length > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    {dayEvents.slice(0, 3).map((ev) => {
                      const dotColor = ev.organizer?.customColor || ev.organizer?.color || 'var(--color-green)'
                      return (
                        <span
                          key={ev.id}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: isSelected ? 'var(--color-cream)' : dotColor }}
                        />
                      )
                    })}
                    {dayEvents.length > 3 && (
                      <span className="text-[9px] font-bold leading-none opacity-80">+</span>
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Selected Date Indicator & Reset Button */}
        {selectedDate && (
          <div className="mt-4 pt-3 flex items-center justify-between border-t border-forest/10 text-xs">
            <span className="font-body opacity-80 text-forest">
              Filter Date:{' '}
              <strong className="font-bold">
                {selectedDate.toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </strong>
            </span>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-teal font-semibold hover:underline"
            >
              Reset Filter ✕
            </button>
          </div>
        )}
      </div>

      {/* ── Right Panel: Event Timeline Feed (col-span-7) ── */}
      <div className="lg:col-span-7 space-y-6">
        {/* Status Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-semibold opacity-60 mr-2 text-forest">Filter Status:</span>
          {[
            { id: 'all', label: 'Semua Event' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                statusFilter === tab.id
                  ? 'bg-forest text-cream shadow-sm'
                  : 'bg-cream text-forest opacity-70 hover:opacity-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline Events Feed */}
        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredEvents.map((event) => {
              const teamColor =
                event.organizer?.customColor || event.organizer?.color || 'var(--color-teal)'

              return (
                <div
                  key={event.id}
                  className="p-4 rounded-md border border-forest/15 bg-gradient-to-r from-forest/5 to-cream/90 relative"
                  style={{
                    borderLeft: `4px solid ${teamColor}`,
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    {/* Date & Team Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="font-body text-xs px-2 py-0.5 rounded font-semibold text-forest/80"
                        style={{ background: 'rgba(15, 51, 10, 0.06)' }}
                      >
                        {formatDate(event.date)}
                        {event.endDate && ` — ${formatDate(event.endDate)}`}
                      </span>

                      {/* Team / Organizer Badge */}
                      {event.organizer && (
                        <span
                          className="font-body text-[11px] px-2 py-0.5 rounded font-semibold text-cream"
                          style={{ background: teamColor }}
                        >
                          {event.organizer.title}
                        </span>
                      )}
                    </div>

                    {/* Status Badge */}
                    <span className={statusMap[event.status]?.className ?? 'badge-completed'}>
                      {statusMap[event.status]?.label ?? event.status}
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3
                    className="font-heading text-lg font-bold mt-1 mb-0.5"
                    style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
                  >
                    {event.title}
                  </h3>

                  {/* Location */}
                  {event.location && (
                    <p
                      className="font-body text-xs text-forest/70 mb-1"
                      style={{ letterSpacing: 0 }}
                    >
                      📍 {event.location}
                    </p>
                  )}

                  {/* Short Description */}
                  {event.shortDescription && (
                    <p
                      className="font-body text-xs text-forest/80 line-clamp-2 leading-relaxed"
                      style={{ letterSpacing: 0 }}
                    >
                      {event.shortDescription}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16 opacity-50 card p-8">
            <p
              className="font-heading text-2xl mb-2"
              style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
            >
              Belum ada events
            </p>
            <p
              className="font-body text-sm"
              style={{ color: 'var(--color-forest)', letterSpacing: 0 }}
            >
              Tidak ada event yang sesuai dengan filter tanggal atau status saat ini.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
