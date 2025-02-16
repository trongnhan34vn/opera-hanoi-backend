\echo 'Creating schema...'

CREATE SCHEMA IF NOT EXISTS account_service_schema;

\echo 'Schema created!'

ALTER ROLE postgres SET search_path TO account_service_schema;

SET search_path TO account_service_schema;

SHOW search_path;