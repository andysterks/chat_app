--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-04-06 21:15:13 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16459)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 213 (class 1259 OID 16419)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    messageid integer NOT NULL,
    userid integer,
    text text,
    createddate date DEFAULT CURRENT_DATE NOT NULL,
    topic text,
    time_created timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16418)
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO postgres;

--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 212
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.messageid;


--
-- TOC entry 211 (class 1259 OID 16409)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text,
    createddate date DEFAULT CURRENT_DATE NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16408)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 210
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3477 (class 2604 OID 16422)
-- Name: messages messageid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages ALTER COLUMN messageid SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- TOC entry 3475 (class 2604 OID 16412)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3629 (class 0 OID 16419)
-- Dependencies: 213
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (messageid, userid, text, createddate, topic, time_created) FROM stdin;
44	8	Yo!!!!	2022-04-02	General	2022-04-02 06:44:14.625655
3	3	Has anyone seen 'Dune'??? If so, what did you think of the cinematography??	2022-03-23	Film & TV	2022-03-24 00:56:09.6229
4	2	Hi all!	2022-03-24	General	2022-03-24 01:58:26.374674
23	7	How's everyone doin' tonight?	2022-03-30	General	2022-03-30 22:48:15.24739
2	1	Hey! Welcome to ChatSpace, thanks for stopping by!	2022-03-23	General	2022-03-24 00:56:09.6229
46	4	Who binged Season 2 of Bridgerton on Netflix??? Vitamin String Quartet's rendition of "Dancing on My Own" yes or YES?!?!	2022-04-04	Music	2022-04-04 05:54:48.560759
32	2	So....What are ya'll's thoughts on NFT's???  😳	2022-03-30	Art	2022-03-30 23:03:24.975193
5	9	Did ya'll hear Ash Barty retired from tennis?!?!? What the jdfklgjdklgjfld!!!!	2022-03-24	Sports	2022-03-24 03:40:46.063933
\.


--
-- TOC entry 3627 (class 0 OID 16409)
-- Dependencies: 211
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, createddate, password) FROM stdin;
42	CrysTest	2022-04-04	$2b$12$rEF7flPGG2uR7HqH/J8Y1.giw.XOpgAwHjw0U96hwBhHXFrrSdIKq
1	CrystalW	2022-03-23	$2b$06$DgOgxLqqL4jiMLVA4kE75.ybW58KUrP4EhGUd1n.cjr8Jdi.JHTKa
2	EmilyThorne	2022-03-23	$2a$06$XOqDnEOJtrUxL5qTMP4p1ejCUhKf95Mam1Q5CzH5xd1y99zEdYE0e
3	JackPorter	2022-03-23	$2a$06$uZGcBHwwd2fR1.iVzBDoLO2pfJRRxdj/gccBPZx2Ew1dvqhShtmO2
4	Nolan Ross	2022-03-24	$2a$06$Oz6uDcNMPZwmVPvoi.wCVeJrgAtGqaiiRLcPi0Zj5gCfLiYjeO6Ua
7	David Clarke	2022-03-24	$2a$06$9GpQ5HCilfy2aOXqLku2ru7M1XAB5D7UVmdQk1/KVnmB5NyZR11ly
8	Aiden Mathis	2022-03-24	$2a$06$yOIWAxcHAdp1Z4x3gpW.gOxssuylRdPvT32kFToGk0XvzdeE9OfAm
9	Charlotte Grayson Clarke	2022-03-24	$2a$06$BJ9Tmp5gmmqhmHOrvgJb6.ztp8QgGHnLtDu6ASRJAalRCirILG.eG
12	test123	2022-03-30	$2a$06$wdlThhMKUbP4oIbC/Muf2.dR63mOJz8vqyK5qedkYhpuHNSATodgi
29	test	2022-03-30	$2a$06$tUl7iLr9Ptley4U657f39.rE80w4VQAlpEchtqDJLZL/a9PBW8I2K
\.


--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 212
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.messages_id_seq', 64, true);


--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 210
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 55, true);


--
-- TOC entry 3485 (class 2606 OID 16427)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (messageid);


--
-- TOC entry 3481 (class 2606 OID 16458)
-- Name: users username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT username UNIQUE (username);


--
-- TOC entry 3483 (class 2606 OID 16417)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3486 (class 2606 OID 16428)
-- Name: messages messages_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id);


-- Completed on 2022-04-06 21:15:13 EDT

--
-- PostgreSQL database dump complete
--

