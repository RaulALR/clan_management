-- Eliminar la base de datos si existe y volver a crearla
DROP DATABASE IF EXISTS clan_management;
CREATE DATABASE clan_management WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';

\connect clan_management;

-- Crear esquema público si no existe
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'public') THEN
        CREATE SCHEMA public;
    END IF;
END $$;

-- Crear secuencias con IF NOT EXISTS
CREATE SEQUENCE IF NOT EXISTS public.matches_id_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS public.player_stats_id_seq AS integer START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS public.players_id_seq AS integer START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE IF NOT EXISTS public.users_id_seq AS integer START WITH 1 INCREMENT BY 1;

-- Crear tabla matches
CREATE TABLE IF NOT EXISTS public.matches (
    id BIGINT DEFAULT nextval('public.matches_id_seq') NOT NULL PRIMARY KEY,
    creation_time TIMESTAMPTZ NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    server_number INT NOT NULL,
    map_name TEXT NOT NULL,
    result_axis INT,
    result_allied INT,
    title VARCHAR(100),
    competitive BOOLEAN DEFAULT false
);

-- Crear tabla players
CREATE TABLE IF NOT EXISTS public.players (
    id INT DEFAULT nextval('public.players_id_seq') NOT NULL PRIMARY KEY,
    player_id TEXT NOT NULL UNIQUE,
    names JSONB,
    steaminfo JSONB DEFAULT '{}'::jsonb,
    lcm BOOLEAN DEFAULT false
);

-- Crear tabla player_stats
CREATE TABLE IF NOT EXISTS public.player_stats (
    id INT DEFAULT nextval('public.player_stats_id_seq') NOT NULL PRIMARY KEY,
    match_id BIGINT NOT NULL,
    player_id TEXT NOT NULL,
    kills INT DEFAULT 0,
    kills_streak INT DEFAULT 0,
    deaths INT DEFAULT 0,
    deaths_without_kill_streak INT DEFAULT 0,
    teamkills INT DEFAULT 0,
    teamkills_streak INT DEFAULT 0,
    deaths_by_tk INT DEFAULT 0,
    deaths_by_tk_streak INT DEFAULT 0,
    nb_vote_started INT DEFAULT 0,
    nb_voted_yes INT DEFAULT 0,
    nb_voted_no INT DEFAULT 0,
    time_seconds INT DEFAULT 0,
    kills_per_minute NUMERIC DEFAULT 0,
    deaths_per_minute NUMERIC DEFAULT 0,
    kill_death_ratio NUMERIC DEFAULT 0,
    longest_life_secs INT,
    shortest_life_secs INT,
    combat INT DEFAULT 0,
    offense INT DEFAULT 0,
    defense INT DEFAULT 0,
    support INT DEFAULT 0,
    most_killed JSONB,
    death_by JSONB,
    weapons JSONB,
    death_by_weapons JSONB,
    steaminfo JSONB,
    CONSTRAINT fk_match FOREIGN KEY (match_id) REFERENCES public.matches(id) ON DELETE CASCADE,
    CONSTRAINT fk_player FOREIGN KEY (player_id) REFERENCES public.players(player_id) ON DELETE CASCADE
);

-- Crear tabla users
CREATE TABLE IF NOT EXISTS public.users (
    id INT DEFAULT nextval('public.users_id_seq') NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'user'
);

-- Establecer propietarios
ALTER SEQUENCE public.matches_id_seq OWNER TO admin;
ALTER SEQUENCE public.player_stats_id_seq OWNER TO admin;
ALTER SEQUENCE public.players_id_seq OWNER TO admin;
ALTER SEQUENCE public.users_id_seq OWNER TO admin;
ALTER TABLE public.matches OWNER TO admin;
ALTER TABLE public.players OWNER TO admin;
ALTER TABLE public.player_stats OWNER TO admin;
ALTER TABLE public.users OWNER TO admin;

-- Permisos de la base de datos
GRANT ALL ON DATABASE clan_management TO admin;
REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
