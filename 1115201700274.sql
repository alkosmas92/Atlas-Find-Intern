--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company (
    company_id uuid NOT NULL,
    username character varying(50),
    password character varying(50),
    namecompany character varying(50),
    afm integer,
    address character varying(50)
);


ALTER TABLE public.company OWNER TO postgres;

--
-- Name: intership; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.intership (
    intership_id uuid NOT NULL,
    company_id uuid,
    titleposition character varying(50),
    filedofintership character varying(50),
    employer character varying(50),
    fieldofstudies character varying(50),
    jobposition character varying(50),
    informationcompany character varying(50),
    infointership character varying(50),
    salary double precision,
    jobtype character varying(50),
    postingdate character varying,
    startdate character varying,
    flag_save boolean,
    flag_online boolean
);


ALTER TABLE public.intership OWNER TO postgres;

--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    student_id uuid NOT NULL,
    username character varying(50),
    password character varying(50),
    firstname character varying(50),
    lastname character varying(50),
    grade double precision,
    university character varying(50),
    yearstudy integer,
    address character varying(50),
    telephone integer
);


ALTER TABLE public.student OWNER TO postgres;

--
-- Name: student_intership; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_intership (
    student_id uuid NOT NULL,
    intership_id uuid NOT NULL,
    flag_save boolean,
    flag_request boolean,
    flag_accept boolean,
    flag_reject boolean,
    flag_answer_accept boolean,
    flag_answer_reject boolean
);


ALTER TABLE public.student_intership OWNER TO postgres;

--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (company_id);


--
-- Name: intership intership_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intership
    ADD CONSTRAINT intership_pkey PRIMARY KEY (intership_id);


--
-- Name: student_intership student_intership_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_intership
    ADD CONSTRAINT student_intership_pkey PRIMARY KEY (student_id, intership_id);


--
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (student_id);


--
-- Name: intership intership_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intership
    ADD CONSTRAINT intership_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(company_id);


--
-- Name: student_intership student_intership_intership_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_intership
    ADD CONSTRAINT student_intership_intership_id_fkey FOREIGN KEY (intership_id) REFERENCES public.intership(intership_id);


--
-- Name: student_intership student_intership_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_intership
    ADD CONSTRAINT student_intership_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(student_id);


--
-- PostgreSQL database dump complete
--

