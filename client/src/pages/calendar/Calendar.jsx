import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../../components/layout/AppLayout";
import { getTasks } from "../../services/taskService";

export default function Calendar() {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchTasks = async () => {
      try {
        setLoading(true);

        const response = await getTasks({
          limit: 200,
        });

        if (mounted) {
          setTasks(response.data.data || []);
        }
      } catch (error) {
        console.error(
          "Failed to load calendar tasks:",
          error
        );

        if (mounted) {
          setTasks([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchTasks();

    return () => {
      mounted = false;
    };
  }, []);

  const days = useMemo(() => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(
      year,
      month,
      1
    ).getDay();

    const daysInMonth = new Date(
      year,
      month + 1,
      0
    ).getDate();

    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      calendarDays.push(
        new Date(year, month, day)
      );
    }

    return calendarDays;
  }, [date]);

  const getTasksForDay = (day) => {
    if (!day) {
      return [];
    }

    return tasks.filter((task) => {
      if (!task.dueDate) {
        return false;
      }

      return (
        new Date(task.dueDate).toDateString() ===
        day.toDateString()
      );
    });
  };

  const previousMonth = () => {
    setDate(
      new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setDate(
      new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        1
      )
    );
  };

  const goToToday = () => {
    setDate(new Date());
  };

  return (
    <AppLayout>
      <div className="page-head">
        <div>
          <p className="eyebrow">Planning</p>

          <h1>Calendar</h1>

          <p className="muted">
            View your scheduled tasks by date.
          </p>
        </div>

        <div className="calendar-nav">
          <button
            type="button"
            className="btn secondary"
            onClick={previousMonth}
            aria-label="Previous month"
          >
            ‹
          </button>

          <strong>
            {date.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </strong>

          <button
            type="button"
            className="btn secondary"
            onClick={nextMonth}
            aria-label="Next month"
          >
            ›
          </button>

          <button
            type="button"
            className="btn secondary"
            onClick={goToToday}
          >
            Today
          </button>
        </div>
      </div>

      {loading ? (
        <div className="empty">
          Loading calendar...
        </div>
      ) : (
        <div className="calendar">
          <div className="weekdays">
            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <b key={day}>{day}</b>
            ))}
          </div>

          <div className="calendar-grid">
            {days.map((day, index) => {
              const dayTasks = getTasksForDay(day);

              return (
                <div
                  className={`day ${
                    day ? "" : "empty-day"
                  }`}
                  key={
                    day
                      ? day.toISOString()
                      : `empty-${index}`
                  }
                >
                  {day && (
                    <>
                      <strong>
                        {day.getDate()}
                      </strong>

                      <div className="calendar-tasks">
                        {dayTasks.map((task) => (
                          <button
                            type="button"
                            key={task._id}
                            onClick={() =>
                              navigate(
                                `/tasks/${task._id}`
                              )
                            }
                            title={task.title}
                          >
                            {task.title}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!loading && !tasks.length && (
        <div className="empty">
          No tasks with due dates yet.
        </div>
      )}
    </AppLayout>
  );
}