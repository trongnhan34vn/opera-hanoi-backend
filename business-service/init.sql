\echo 'Creating schema...'

CREATE SCHEMA IF NOT EXISTS business_service_schema;

\echo 'Schema created!'

ALTER ROLE postgres SET search_path TO business_service_schema;

SET search_path TO business_service_schema;

SHOW search_path;