alter table public.prototype_access_requests
  add constraint prototype_access_requests_email_format_check
    check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(email) <= 254),
  add constraint prototype_access_requests_message_length_check
    check (message is null or length(message) <= 2000),
  add constraint prototype_access_requests_score_range_check
    check (score >= 0 and score <= 100);