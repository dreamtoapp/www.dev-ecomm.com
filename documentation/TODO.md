# TODO: Dashboard Notification Reliability

- [ ] Implement smarter fallback polling for notifications in the dashboard.
    - Use the Page Visibility API to poll only when the dashboard is visible/active.
    - Increase polling interval to 2–5 minutes to reduce server load.
    - Consider delta fetching (fetch only new notifications since last check) for efficiency.
    - Keep current Pusher real-time logic as primary, use polling as backup.
- [ ] Review and optimize notification fetching logic in `PusherNotify.tsx` and `NotifyDialog.tsx`.
- [ ] Test for missed notifications and ensure dashboard always shows the latest state.

_Note: This will improve reliability for users who miss real-time events due to connection or browser issues._
