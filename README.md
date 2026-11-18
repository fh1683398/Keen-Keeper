# KeenKeeper

Your personal shelf of meaningful connections. KeenKeeper helps you browse, tend, and nurture the relationships that matter most by tracking check-ins, visualizing interaction habits, and reminding you when it's time to reconnect.

## Live Demo

[Add your live deployment link here]

## Features

- **Relationship Dashboard:** View all your friends at a glance alongside live status metrics (Total Friends, On Track, Need Attention, and Interactions This Month).
- **Friend Profiles & Status Tracking:** Detailed profile pages displaying days since last contact, relationship frequency goals, next due dates, and status badges (`On-Track`, `Almost Due`, `Overdue`).
- **Quick Check-Ins with Instant Feedback:** Log **Call**, **Text**, or **Video** interactions directly from a friend's profile with real-time toast notifications (`react-hot-toast`).
- **Persistent Interaction Timeline:** Chronological history of all logged check-ins stored in `localStorage`, complete with interaction type filtering (`All`, `Calls`, `Texts`, `Videos`).
- **Friendship Analytics:** Interactive donut chart built with `Recharts` breaking down check-ins by interaction type.
- **Responsive & Resilient Routing:** Mobile-first responsive UI with loading states, a custom 404 Not Found page, and SPA reload support for deployment.

## Tech Stack

- **Frontend:** React, Vite
- **Routing:** React Router (`createBrowserRouter`)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Notifications:** React Hot Toast
- **Persistence:** Browser `localStorage`
