create function uuid_nil() returns uuid
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function uuid_nil() owner to postgres;

create function uuid_ns_dns() returns uuid
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function uuid_ns_dns() owner to postgres;

create function uuid_ns_url() returns uuid
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function uuid_ns_url() owner to postgres;

create function uuid_ns_oid() returns uuid
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function uuid_ns_oid() owner to postgres;

create function uuid_ns_x500() returns uuid
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function uuid_ns_x500() owner to postgres;

create function uuid_generate_v1() returns uuid
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function uuid_generate_v1() owner to postgres;

create function uuid_generate_v1mc() returns uuid
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function uuid_generate_v1mc() owner to postgres;

create function uuid_generate_v3(namespace uuid, name text) returns uuid
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function uuid_generate_v3(uuid, text) owner to postgres;

create function uuid_generate_v4() returns uuid
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function uuid_generate_v4() owner to postgres;

create function uuid_generate_v5(namespace uuid, name text) returns uuid
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function uuid_generate_v5(uuid, text) owner to postgres;

create function checkconcerttimeduplication(starttime timestamp without time zone, endtime timestamp without time zone) returns SETOF concert_service_schema.concerts
    language plpgsql
as
$$
BEGIN
    return query
        select concerts.*
        from concert_service_schema.concerts
                 join concert_service_schema.show_times on concerts.id = show_times."concertId"
        where "startTime" between startTime and endTime
            or "endTime" between startTime and endTime
            OR ("startTime" <= startTime AND "endTime" >= endTime);
END
$$;

alter function checkconcerttimeduplication(timestamp, timestamp) owner to postgres;

create function count_concerts_within_2_weeks() returns integer
    language plpgsql
as
$$
BEGIN
    return (SELECT COUNT(DISTINCT concerts.id)
            FROM concert_service_schema.concerts
                     LEFT JOIN concert_service_schema.show_times st ON concerts.id = st."concertId"
            WHERE "startTime" BETWEEN NOW() AND NOW() + INTERVAL '14 days'
    );
end;
$$;

alter function count_concerts_within_2_weeks() owner to postgres;

create function get_concerts_within_2_weeks(p_limit integer, p_offset integer)
    returns TABLE(id uuid, title character varying, description character varying, art character varying, director character varying, images json, show_times json)
    language plpgsql
as
$$
BEGIN
    RETURN QUERY
        SELECT concerts.id,
               concerts.title,
               concerts.description,
               concerts.art,
               concerts.director,
               COALESCE(
                               json_agg(
                               json_build_object(
                                       'url', i.url
                               )
                               ORDER BY st."startTime"
                                       ) FILTER (WHERE st.id IS NOT NULL),
                               '[]'
               ) AS images,
               COALESCE(
                               json_agg(
                               json_build_object(
                                       'startTime', TO_CHAR(st."startTime", 'YYYY/MM/DD HH24:MI:SS'),
                                       'endTime', TO_CHAR(st."endTime", 'YYYY/MM/DD HH24:MI:SS')
                               )
                               ORDER BY st."startTime"
                                       ) FILTER (WHERE st.id IS NOT NULL),
                               '[]'
               ) AS show_times
        FROM concert_service_schema.concerts
                 LEFT JOIN concert_service_schema.show_times st ON concerts.id = st."concertId"
                 LEFT JOIN concert_service_schema.images i on concerts.id = i."concertId"
        WHERE "startTime" BETWEEN NOW() AND NOW() + INTERVAL '14 days'
        GROUP BY concerts.id
        ORDER BY MIN("startTime") -- Sắp xếp theo thời gian bắt đầu của show time đầu tiên
        LIMIT p_limit OFFSET p_offset;
end;
$$;

alter function get_concerts_within_2_weeks(integer, integer) owner to postgres;


