package models

import (
	"github.com/google/uuid"
	_ "github.com/lib/pq" // postgres golang driver
)

// User schema of the user table
type User struct {
	PERSON_ID  int64  `json:"id"`
	FIRST_NAME string `json:"name"`
	LAST_NAME  string `json:"last"`
}

type Student struct {
	STUDENT_ID uuid.UUID `json:"student_id"`
	USERNAME   string    `json:"username"`
	PASSWORD   string    `json:"password"`
	FIRSTNAME  string    `json:"firstname"`
	LASTNAME   string    `json:"lastname"`
	GRADE      float32   `json:"grade"`
	UNIVERSITY string    `json:"university"`
	YEAR       int32     `json:"year"`
	EMAIL      string    `json:"email"`
	TELEPHONE  int32     `json:"telephone"`
}

type Company struct {
	COMPANY_ID  uuid.UUID `json:"company_id"`
	USERNAME    string    `json:"username"`
	PASSWORD    string    `json:"password"`
	COMPANYNAME string    `json:"companyname"`
	AFM         int32     `json:"afm"`
	ADDRESS     string    `json:"address"`
	//TELEPHONE  string `json:"telephone"`
	//EMAIL      string `json:"email"`
}

type Intership struct {
	INTERSHIP_ID uuid.UUID `json:"intership_id"`
	COMPANY_ID   uuid.UUID `json:"for_company_id"`
	TITLE        string    `json:"title"`
	FILE         string    `json:"file"`
	EMPLOYER     string    `json:"employer"`
	STUDIES      string    `json:"studies"`
	POSISION     string    `json:"posision"`
	INFOCOMP     string    `json:"infocomp"`
	INFOINTER    string    `json:"infointer"`
	SALARY       float32   `json:"salary"`
	JOBTYPE      string    `json:"jobtype"`
	POSTDATE     string    `json:"postdate"`
	STARTDATE    string    `json:"startdate"`
	FLAG_SAVE    bool      `json:"flag_save"`
	FLAG_ONLINE  bool      `json:"flag_online"`
}

type Relate_Student_Intership struct {
	STUDENT_ID         uuid.UUID `json:"student_id"`
	INTERSHIP_ID       uuid.UUID `json:"intership_id"`
	FLAG_SAVE          bool      `json:"flag_save"`
	FLAG_REQUEST       bool      `json:"flag_request"`
	FLAG_ACCEPT        bool      `json:"flag_accept"`
	FLAG_REJECT        bool      `json:"flag_reject"`
	FLAG_ANSWER_ACCEPT bool      `json:"flag_answer_accept"`
	FLAG_ANSWER_REJECT bool      `json:"flag_answer_reject"`
}

type Match struct {
	INTERSHIP_ID uuid.UUID `json:"intership_id"`
	COMPANY_ID   uuid.UUID `json:"for_company_id"`
	TITLE        string    `json:"title"`
	FILE         string    `json:"file"`
	EMPLOYER     string    `json:"employer"`
	STUDIES      string    `json:"studies"`
	POSISION     string    `json:"posision"`
	INFOCOMP     string    `json:"infocomp"`
	INFOINTER    string    `json:"infointer"`
	SALARY       float32   `json:"salary"`
	JOBTYPE      string    `json:"jobtype"`
	POSTDATE     string    `json:"postdate"`
	STARTDATE    string    `json:"startdate"`
	STUDENT_ID   uuid.UUID `json:"student_id"`
	FIRSTNAME    string    `json:"firstname"`
	LASTNAME     string    `json:"lastname"`
	GRADE        float32   `json:"grade"`
	UNIVERSITY   string    `json:"university"`
	YEAR         int32     `json:"year"`
	EMAIL        string    `json:"email"`
	TELEPHONE    int32     `json:"telephone"`
}
