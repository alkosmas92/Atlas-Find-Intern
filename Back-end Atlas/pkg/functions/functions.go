package functions

import (
	"database/sql"

	"github.com/google/uuid"

	//"log"
	//"encoding/json"
	"fmt"
	//"log"
	//"net/http"

	"go-postgres/pkg/models"
	//"os"
	//"strconv"

	//"github.com/gorilla/mux"

	//"github.com/joho/godotenv"
	_ "github.com/lib/pq" // postgres golang driver
)

const (
	host     = "localhost"
	port     = 5432
	user     = "myuser"
	password = "mypass"
	dbname   = "last"
)

func createConnection() *sql.DB {
	fmt.Println("Hello world")
	psqlconn := fmt.Sprintf("host= %s port= %d  user= %s password= %s dbname= %s sslmode=disable", host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlconn)

	CheckError(err)

	//defer db.Close()
	fmt.Println("Successfully connected!")

	return db

}

func CheckError(err error) {
	if err != nil {
		panic(err)
	}
}

// O Student dimiourgi profile OK
func InsertStudent(student models.Student) uuid.UUID {

	// create the postgres db connection
	db := createConnection()

	// close the db connection
	defer db.Close()

	// create the insert sql query

	insertStmt := `insert into "student"("student_id","username","password","firstname","lastname","grade","university","yearstudy","address","telephone") values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING "student_id"`
	var id uuid.UUID
	e := db.QueryRow(insertStmt, student.STUDENT_ID, student.USERNAME, student.PASSWORD, student.FIRSTNAME, student.LASTNAME, student.GRADE, student.UNIVERSITY, student.YEAR, student.EMAIL, student.TELEPHONE).Scan(&id)
	CheckError(e)
	fmt.Printf("Inserted a single record %v %s %s", id, student.FIRSTNAME, student.LASTNAME)

	return id
}

// O Ergodotis dimiourgi profile OK
func InsertCompany(company models.Company) uuid.UUID {

	// create the postgres db connection
	db := createConnection()

	// close the db connection
	defer db.Close()

	// create the insert sql query

	insertStmt := `insert into "company"("company_id","username","password","namecompany","afm","address") values($1,$2,$3,$4,$5,$6) RETURNING "company_id"`
	var id uuid.UUID
	e := db.QueryRow(insertStmt, company.COMPANY_ID, company.USERNAME, company.PASSWORD, company.COMPANYNAME, company.AFM, company.ADDRESS).Scan(&id)
	CheckError(e)
	fmt.Printf("Inserted a single record %s %s %s", id, company.COMPANYNAME, company.ADDRESS)

	return id
}

// O Ergodotis dimiourgi mia Intership OK
func InsertIntership(intership models.Intership) uuid.UUID {

	// create the postgres db connection
	db := createConnection()

	// close the db connection
	defer db.Close()

	// create the insert sql query

	insertStmt := `insert into "intership"("intership_id","company_id","titleposition","filedofintership","employer","fieldofstudies","jobposition","informationcompany","infointership","salary","jobtype","postingdate","startdate","flag_save","flag_online") values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING "intership_id"`
	var id uuid.UUID
	e := db.QueryRow(insertStmt, intership.INTERSHIP_ID, intership.COMPANY_ID, intership.TITLE, intership.FILE, intership.EMPLOYER, intership.STUDIES, intership.POSISION, intership.INFOCOMP, intership.INFOINTER, intership.SALARY, intership.JOBTYPE, intership.POSTDATE, intership.STARTDATE, intership.FLAG_SAVE, intership.FLAG_ONLINE).Scan(&id)
	CheckError(e)
	fmt.Printf("Inserted a single record %s %s %s", id, intership.TITLE, intership.POSISION)

	return id
}

// O Student kanei kinisi gia mia Intership OK
func Insert_Relate_Student_Intership(relate_student_intership models.Relate_Student_Intership) uuid.UUID {

	// create the postgres db connection
	db := createConnection()

	// close the db connection
	defer db.Close()

	// create the insert sql query

	insertStmt := `insert into "student_intership"("student_id","intership_id","flag_save","flag_request","flag_accept","flag_reject","flag_answer_accept","flag_answer_reject") values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING "intership_id"`
	var id uuid.UUID
	e := db.QueryRow(insertStmt, relate_student_intership.STUDENT_ID, relate_student_intership.INTERSHIP_ID, relate_student_intership.FLAG_SAVE, relate_student_intership.FLAG_REQUEST, relate_student_intership.FLAG_ACCEPT, relate_student_intership.FLAG_REJECT, relate_student_intership.FLAG_ANSWER_ACCEPT, relate_student_intership.FLAG_ANSWER_REJECT).Scan(&id)
	CheckError(e)
	fmt.Printf("Inserted a single record %s %s ", relate_student_intership.INTERSHIP_ID, id)

	return id
}

// O Student kanei sign in OK
func GetsigninStudent(student models.Student) models.Student {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()
	var correct_student models.Student
	getcorrectStmt := `SELECT * FROM "student" WHERE "username"=$1 AND "password"=$2`
	row := db.QueryRow(getcorrectStmt, student.USERNAME, student.PASSWORD)
	err := row.Scan(&correct_student.STUDENT_ID, &correct_student.USERNAME, &correct_student.PASSWORD, &correct_student.FIRSTNAME, &correct_student.LASTNAME, &correct_student.GRADE, &correct_student.UNIVERSITY, &correct_student.YEAR, &correct_student.EMAIL, &correct_student.TELEPHONE)
	//CheckError(err)
	if err == nil {
		return correct_student
	}
	var empty_student models.Student
	return empty_student
}

// O Company kanei sign in OK
func GetsigninCompany(company models.Company) models.Company {
	db := createConnection()
	defer db.Close()
	var correct_company models.Company
	getcorrectStmt := `SELECT * FROM "company" WHERE "username"=$1 AND "password"=$2`
	row := db.QueryRow(getcorrectStmt, company.USERNAME, company.PASSWORD)
	err := row.Scan(&correct_company.COMPANY_ID, &correct_company.USERNAME, &correct_company.PASSWORD, &correct_company.COMPANYNAME, &correct_company.AFM, &correct_company.ADDRESS)
	if err == nil {
		return correct_company
	}
	var empty_company models.Company
	return empty_company
}

// Check the relation OK
func Checkstudentintership(student_id string, rsi models.Relate_Student_Intership) bool {
	db := createConnection()
	defer db.Close()
	var relate models.Relate_Student_Intership
	fmt.Printf("%s %s", student_id, rsi.INTERSHIP_ID)
	getStmt := `SELECT * FROM "student_intership" WHERE "student_id"=$1 AND "intership_id"=$2`
	row := db.QueryRow(getStmt, student_id, rsi.INTERSHIP_ID)
	err := row.Scan(&relate.INTERSHIP_ID, &relate.STUDENT_ID, &relate.FLAG_SAVE, &relate.FLAG_REQUEST, &relate.FLAG_ACCEPT, &relate.FLAG_REJECT, &relate.FLAG_ANSWER_ACCEPT, &relate.FLAG_ANSWER_REJECT)
	fmt.Printf("%s %s", relate.STUDENT_ID, relate.INTERSHIP_ID)
	return err == nil

}

// O Student pairnei oles tis intership pou exi apothikeusei xwris na exi kanei request OK
func GetallsavedStudentIntership(student_id string) []models.Intership {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()

	var interships []models.Intership

	getallstudentinterships := ` SELECT "intership_id" FROM "student_intership" WHERE "student_id"=$1 AND "flag_save"=$2 AND "flag_request"=$3 ` //pinakas me inter_id tou student_id
	rows, err := db.Query(getallstudentinterships, student_id, true, false)
	//CheckError(err)
	if err != nil {
		return interships
	}
	//vres oli tin pliroforia tou kathe intership_id gia ton student_id

	defer rows.Close()

	for rows.Next() {
		var inter models.Intership

		var intership_id string
		err := rows.Scan(&intership_id)
		fmt.Printf("Found a single record %s\n", intership_id)
		CheckError(err)
		getStmt := `SELECT * FROM "intership" WHERE "intership_id"=$1`
		row := db.QueryRow(getStmt, intership_id)
		err2 := row.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		CheckError(err2)
		interships = append(interships, inter)

	}
	return interships

}

// O Student pairnei oles tis intership pou exi stilei  aitima kai einai ekremmeis OK
func GetallrequestedStudentIntership(student_id string) []models.Intership {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()

	var interships []models.Intership

	getallstudentinterships := ` SELECT "intership_id" FROM "student_intership" WHERE "student_id"=$1 AND "flag_request"=$2 AND "flag_answer_reject"=$3 AND "flag_answer_accept"=$4 ` //pinakas me inter_id tou student_id
	rows, err := db.Query(getallstudentinterships, student_id, true, false, false)
	//CheckError(err)
	if err != nil {
		return interships
	}

	defer rows.Close()

	for rows.Next() {
		var inter models.Intership

		var intership_id string
		err := rows.Scan(&intership_id)
		fmt.Printf("Found a single record %s\n", intership_id)
		CheckError(err)
		getStmt := `SELECT * FROM "intership" WHERE "intership_id"=$1`
		row := db.QueryRow(getStmt, intership_id)
		err2 := row.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		CheckError(err2)
		interships = append(interships, inter)

	}
	return interships

}

// O Student pairnei oles tis intership pou ton exoun apodextei OK
func GetallacceptedStudentIntership(student_id string) []models.Intership {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()

	var interships []models.Intership

	getallstudentinterships := ` SELECT "intership_id" FROM "student_intership" WHERE "student_id"=$1 AND "flag_request"=$2 AND "flag_answer_accept"=$3 ` //pinakas me inter_id tou student_id
	rows, err := db.Query(getallstudentinterships, student_id, true, true)
	//CheckError(err)
	//vres oli tin pliroforia tou kathe intership_id gia ton student_id
	if err != nil {
		return interships
	}
	defer rows.Close()

	for rows.Next() {
		var inter models.Intership

		var intership_id string
		err := rows.Scan(&intership_id)
		fmt.Printf("Found a single record %s\n", intership_id)
		CheckError(err)
		getStmt := `SELECT * FROM "intership" WHERE "intership_id"=$1`
		row := db.QueryRow(getStmt, intership_id)
		err2 := row.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		CheckError(err2)
		interships = append(interships, inter)

	}
	return interships

}

// O Student pairnei oles tis intership pou ton exoun aporipsei OK
func GetallrejectedStudentIntership(student_id string) []models.Intership {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()

	var interships []models.Intership

	getallstudentinterships := ` SELECT "intership_id" FROM "student_intership" WHERE "student_id"=$1 AND "flag_request"=$2 AND "flag_answer_reject"=$3 ` //pinakas me inter_id tou student_id
	rows, err := db.Query(getallstudentinterships, student_id, true, true)
	//CheckError(err)
	//vres oli tin pliroforia tou kathe intership_id gia ton student_id
	if err != nil {
		return interships
	}

	defer rows.Close()

	for rows.Next() {
		var inter models.Intership

		var intership_id string
		err := rows.Scan(&intership_id)
		fmt.Printf("Found a single record %s\n", intership_id)
		CheckError(err)
		getStmt := `SELECT * FROM "intership" WHERE "intership_id"=$1`
		row := db.QueryRow(getStmt, intership_id)
		err2 := row.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		CheckError(err2)
		interships = append(interships, inter)

	}
	return interships

}

// Epistrofi mias Intership
func Getintership(intership_id string) models.Intership {
	db := createConnection()
	// close the db connection
	defer db.Close()
	var inter models.Intership

	getStmt := ` SELECT * FROM "intership" WHERE "intership_id"=$1`
	row := db.QueryRow(getStmt, intership_id)

	err := row.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
	//CheckError(err)
	if err != nil {
		return inter
	}
	return inter
}

func GetallrelateStudentIntership(intership_id string) models.Relate_Student_Intership {
	db := createConnection()
	// close the db connection
	defer db.Close()
	var inter models.Relate_Student_Intership
	fmt.Printf("AALLLLPOOOO")

	getStmt := ` SELECT * FROM "student_intership" WHERE "intership_id"=$1`
	row := db.QueryRow(getStmt, intership_id)

	fmt.Print("inter\n", row)

	err := row.Scan(&inter.INTERSHIP_ID, &inter.STUDENT_ID, &inter.FLAG_SAVE, &inter.FLAG_REQUEST, &inter.FLAG_ACCEPT, &inter.FLAG_REJECT, &inter.FLAG_ANSWER_ACCEPT, &inter.FLAG_ANSWER_REJECT)
	//CheckError(err)

	if err != nil {
		return inter
	}
	return inter
}

// O Student pairnei oles tis dimosieumenes interships tou Atla OK
func Getallintership() []models.Intership {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()

	var interships []models.Intership

	getallStmt := `SELECT * FROM "intership" WHERE "flag_online"=$1`
	rows, err := db.Query(getallStmt, true)
	//CheckError(err)
	if err != nil {
		return interships
	}
	for rows.Next() {
		var inter models.Intership
		rows.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		interships = append(interships, inter)
	}
	return interships
}

// Paizi na faei delete
func Getallcritiriointership(critirio string) ([]models.Intership, error) {
	db := createConnection()
	defer db.Close()
	var interships []models.Intership
	getallStmt := `SELECT * FROM "intership" WHERE "flag_online"=$1 AND "employer"=$2`
	rows, err := db.Query(getallStmt, true, critirio)
	CheckError(err)

	for rows.Next() {
		var inter models.Intership
		err = rows.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		interships = append(interships, inter)
	}
	return interships, err
}

// Epistrofi intership me vasi employer OK
func GetByEmployerInter(critirio string) []models.Intership {
	db := createConnection()
	defer db.Close()
	var interships []models.Intership
	getallStmt := `SELECT * FROM "intership" WHERE "flag_online"=$1 AND "employer"=$2`
	rows, err := db.Query(getallStmt, true, critirio)
	//CheckError(err)
	if err != nil {
		return interships
	}
	for rows.Next() {
		var inter models.Intership
		rows.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		interships = append(interships, inter)
	}
	return interships
}

// Epistrofi intership me vasi title OK
func GetByTitleInter(critirio string) []models.Intership {
	db := createConnection()
	defer db.Close()
	var interships []models.Intership
	getallStmt := `SELECT * FROM "intership" WHERE "flag_online"=$1 AND "titleposition"=$2`
	rows, err := db.Query(getallStmt, true, critirio)
	//CheckError(err)
	if err != nil {
		return interships
	}
	for rows.Next() {
		var inter models.Intership
		rows.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		interships = append(interships, inter)
	}
	return interships
}

// Epistrofi intership me vasi studies OK
func GetByStudiesInter(critirio string) []models.Intership {
	db := createConnection()
	defer db.Close()
	var interships []models.Intership
	getallStmt := `SELECT * FROM "intership" WHERE "flag_online"=$1 AND "fieldofstudies"=$2`
	rows, err := db.Query(getallStmt, true, critirio)
	//CheckError(err)
	if err != nil {
		return interships
	}
	for rows.Next() {
		var inter models.Intership
		rows.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		interships = append(interships, inter)
	}
	return interships
}

// Epistrofi intership me vasi possision OK
func GetByPossisionInter(critirio string) []models.Intership {
	db := createConnection()
	defer db.Close()
	var interships []models.Intership
	getallStmt := `SELECT * FROM "intership" WHERE "flag_online"=$1 AND "jobposition"=$2`
	rows, err := db.Query(getallStmt, true, critirio)
	//CheckError(err)
	if err != nil {
		return interships
	}
	for rows.Next() {
		var inter models.Intership
		rows.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		interships = append(interships, inter)
	}
	return interships
}

// Epistrofi intership me vasi Jobtype OK
func GetByJobtypeInter(critirio string) []models.Intership {
	db := createConnection()
	defer db.Close()
	var interships []models.Intership
	getallStmt := `SELECT * FROM "intership" WHERE "flag_online"=$1 AND "jobtype"=$2`
	rows, err := db.Query(getallStmt, true, critirio)
	//CheckError(err)
	if err != nil {
		return interships
	}
	for rows.Next() {
		var inter models.Intership
		rows.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		interships = append(interships, inter)
	}
	return interships
}

// O Company pairnei oles tis apothikevmenes interships tou OK
func GetallsavedCompanyIntership(company_id string) []models.Intership {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()
	var interships []models.Intership
	getallstudentinterships := ` SELECT *  FROM "intership" WHERE "company_id"=$1 AND "flag_save"=$2`
	rows, err := db.Query(getallstudentinterships, company_id, true)
	//CheckError(err)
	if err != nil {
		return interships
	}
	//vres oli tin pliroforia tou kathe intership_id gia ton student_id
	defer rows.Close()
	for rows.Next() {
		var inter models.Intership
		err2 := rows.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		CheckError(err2)
		interships = append(interships, inter)
	}
	return interships
}

// O Company pairnei oles tis online interships tou OK
func GetallonlineCompanyIntership(company_id string) []models.Intership {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()
	var interships []models.Intership
	getallstudentinterships := ` SELECT *  FROM "intership" WHERE "company_id"=$1 AND "flag_online"=$2`
	rows, err := db.Query(getallstudentinterships, company_id, true)
	//CheckError(err)
	if err != nil {
		return interships
	}
	//vres oli tin pliroforia tou kathe intership_id gia ton student_id
	defer rows.Close()
	for rows.Next() {
		var inter models.Intership
		err2 := rows.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		CheckError(err2)
		interships = append(interships, inter)
	}
	return interships
}

// O Company pairnei oles tis intership pou exi dexti aitima OK
func GetallrequestedInterships(company_id string) []models.Intership {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()
	var interships []models.Intership
	getallrequestedinterships := ` SELECT intership.intership_id,intership.company_id,
	intership.titleposition,intership.filedofintership,intership.employer,intership.fieldofstudies,
	intership.jobposition,intership.informationcompany,intership.infointership,intership.salary,intership.jobtype,
	intership.postingdate,intership.startdate,intership.flag_save,intership.flag_online 
	FROM "intership", "student_intership" WHERE 
	intership.company_id=$1 AND 
	intership.intership_id=student_intership.intership_id AND
	student_intership.flag_request=$2;`
	rows, err := db.Query(getallrequestedinterships, company_id, true)
	//CheckError(err)
	if err != nil {
		return interships
	}
	//vres oli tin pliroforia tou kathe intership_id gia ton student_id
	defer rows.Close()
	for rows.Next() {
		var inter models.Intership
		err2 := rows.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
		CheckError(err2)
		interships = append(interships, inter)
	}
	return interships
}

// O Company pairnei olous tous Student pou exoun stilei aitima gia mia intership OK
func GetallrequestCompanyIntership(company_id string, intership_id string) []models.Student {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()

	var students []models.Student

	getallstudentrequests := ` SELECT "student_id" FROM "student_intership" WHERE "intership_id"=$1 AND "flag_request"=$2 AND "flag_answer_accept"=$3 AND "flag_answer_reject"=$4 ` //pinakas me students_id tou inter_id
	rows, err := db.Query(getallstudentrequests, intership_id, true, false, false)
	//CheckError(err)
	if err != nil {
		return students
	}
	//vres oli tin pliroforia tou kathe intership_id gia ton student_id

	defer rows.Close()

	for rows.Next() {
		var student models.Student

		var student_id string
		err := rows.Scan(&student_id)
		fmt.Printf("Found a single record %s\n", student_id)
		CheckError(err)
		getStmt := `SELECT * FROM "student" WHERE "student_id"=$1`
		row := db.QueryRow(getStmt, student_id)
		err2 := row.Scan(&student.STUDENT_ID, &student.USERNAME, &student.PASSWORD, &student.FIRSTNAME, &student.LASTNAME, &student.GRADE, &student.UNIVERSITY, &student.YEAR, &student.EMAIL, &student.TELEPHONE)
		CheckError(err2)
		students = append(students, student)

	}
	return students

}

/*func GetallUsers() ([]models.User, error) {
	// create the postgres db connection
	db := createConnection()

	// close the db connection
	defer db.Close()

	var users []models.User

	// create the select sql query
	getallStmt := `SELECT * FROM "person"`

	// execute the sql statement
	rows, err := db.Query(getallStmt)
	CheckError(err)

	// close the statement
	defer rows.Close()

	// iterate over the rows
	for rows.Next() {
		var user models.User

		// unmarshal the row object to user
		err = rows.Scan(&user.PERSON_ID, &user.FIRST_NAME, &user.LAST_NAME)

		// append the user in the users slice
		users = append(users, user)

	}

	// return empty user on error
	return users, err
}

func Deleteuser(id int64) int64 {
	db := createConnection()
	defer db.Close()
	deleteStmt := `DELETE FROM "person" where "person_id"=$1`
	res, err := db.Exec(deleteStmt, id)
	CheckError(err)
	rowsAffected, err := res.RowsAffected()
	CheckError(err)
	fmt.Printf("Total rows/record affected %v", rowsAffected)
	return rowsAffected
}
*/

// O Company diagrafei mia intership OK
func CompanydeleteIntership(intership_id string) int64 {
	db := createConnection()
	defer db.Close()
	deleteStmt := `DELETE FROM "intership" where "intership_id"=$1`
	res, err := db.Exec(deleteStmt, intership_id)
	CheckError(err)
	rowsAffected, err := res.RowsAffected()
	CheckError(err)
	fmt.Printf("Total rows/record affected %v", rowsAffected)
	return rowsAffected
}

// O Student diagrafei mia intership OK
func StudentdeleteIntership(student_id string, intership_id string) int64 {
	db := createConnection()
	defer db.Close()
	deleteStmt := `DELETE FROM "student_intership" where "student_id"=$1 AND "intership_id"=$2`
	res, err := db.Exec(deleteStmt, student_id, intership_id)
	CheckError(err)
	rowsAffected, err := res.RowsAffected()
	CheckError(err)
	fmt.Printf("Total rows/record affected %v", rowsAffected)
	return rowsAffected
}

// O Student allazi tis plirofories apothikevmenis aitisis , stelnei aitima OK
func Updatestudentintership(relate_student_intership models.Relate_Student_Intership, student_id string) int64 {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()

	updateStmt := `UPDATE "student_intership" set "flag_save"=$3, "flag_request"=$4, "flag_accept"=$5,"flag_reject"=$6 ,"flag_answer_accept"=$7,"flag_answer_reject"=$8 where "student_id"=$1 AND "intership_id"=$2`
	res, err := db.Exec(updateStmt, student_id, relate_student_intership.INTERSHIP_ID, relate_student_intership.FLAG_SAVE, relate_student_intership.FLAG_REQUEST, relate_student_intership.FLAG_ACCEPT, relate_student_intership.FLAG_REJECT, relate_student_intership.FLAG_ANSWER_ACCEPT, relate_student_intership.FLAG_ANSWER_REJECT)
	CheckError(err)
	rowsAffected, err := res.RowsAffected()
	CheckError(err)
	fmt.Printf("Total rows/record affected %v", rowsAffected)
	return rowsAffected

}

// O Company allazi tis plirofories apothikevmenis aitisis,dimosieuei OK
func Updatecompanyintership(intership models.Intership, company_id string) int64 {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()

	updateStmt := `UPDATE "intership" set "titleposition"=$3,"filedofintership"=$4,"employer"=$5,"fieldofstudies"=$6,"jobposition"=$7,"informationcompany"=$8,"infointership"=$9,"salary"=$10,"jobtype"=$11,"postingdate"=$12,"startdate"=$13,"flag_save"=$14,"flag_online"=$15 where "company_id"=$1 AND "intership_id"=$2`
	res, err := db.Exec(updateStmt, company_id, intership.INTERSHIP_ID, intership.TITLE, intership.FILE, intership.EMPLOYER, intership.STUDIES, intership.POSISION, intership.INFOCOMP, intership.INFOINTER, intership.SALARY, intership.JOBTYPE, intership.POSTDATE, intership.STARTDATE, intership.FLAG_SAVE, intership.FLAG_ONLINE)
	CheckError(err)
	rowsAffected, err := res.RowsAffected()
	CheckError(err)
	fmt.Printf("Total rows/record affected %v", rowsAffected)
	return rowsAffected

}

// O Company kanei accept mia intership tou Student , parallila enimerwnete kai o student OK
func Updatecompanyacceptstudentintership(company_id string, intership_id string, student_id string) int64 {
	db := createConnection()
	defer db.Close()
	updateStmt2 := `UPDATE "student_intership" set "flag_answer_accept"=$3 where "student_id"=$1 AND "intership_id"=$2`
	res2, err2 := db.Exec(updateStmt2, student_id, intership_id, true)
	CheckError(err2)
	rowsAffected2, err2 := res2.RowsAffected()
	CheckError(err2)
	fmt.Printf("Total rows/record affected %v", rowsAffected2)
	return rowsAffected2
}

// O Company kanei reject mia intership tou Student , parallila enimerwnete kai o student OK
func Updatecompanyrejectstudentintership(company_id string, intership_id string, student_id string) int64 {
	db := createConnection()
	defer db.Close()
	updateStmt2 := `UPDATE "student_intership" set "flag_answer_reject"=$3 where "student_id"=$1 AND "intership_id"=$2`
	res2, err2 := db.Exec(updateStmt2, student_id, intership_id, true)
	CheckError(err2)
	rowsAffected2, err2 := res2.RowsAffected()
	CheckError(err2)
	fmt.Printf("Total rows/record affected %v", rowsAffected2)
	return rowsAffected2
}

// O Student kanei accept to deal tis Company gia intership OK
func Updatestudentacceptdeal(student_id string, intership_id string) int64 {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()
	//Kane Update ton pinaka me tis interships
	updateStmt := `UPDATE "student_intership" set "flag_accept"=$3 where "student_id"=$1 AND "intership_id"=$2`
	res, err := db.Exec(updateStmt, student_id, intership_id, true)
	CheckError(err)
	rowsAffected, err := res.RowsAffected()
	CheckError(err)
	fmt.Printf("Total rows/record affected %v", rowsAffected)
	return rowsAffected
}

func UpdateStudentRequest(student_id string, intership_id string) int64 {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()
	//Kane Update ton pinaka me tis interships
	updateStmt := `UPDATE "student_intership" set "flag_save"=$3 and "flag_request"=$4 where "student_id"=$1 AND "intership_id"=$2`
	res, err := db.Exec(updateStmt, student_id, intership_id, false, true)
	CheckError(err)
	rowsAffected, err := res.RowsAffected()
	CheckError(err)
	fmt.Printf("Total rows/record affected %v", rowsAffected)
	return rowsAffected

}

// O Student kanei reject to deal tis Company gia intership OK
func Updatestudentrejectdeal(student_id string, intership_id string) int64 {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()
	//Kane Update ton pinaka me tis interships
	updateStmt := `UPDATE "student_intership" set "flag_reject"=$3,"flag_request"=$4 ,"flag_answer_accept"=$5 where "student_id"=$1 AND "intership_id"=$2`
	res, err := db.Exec(updateStmt, student_id, intership_id, true, false, false)
	CheckError(err)
	rowsAffected, err := res.RowsAffected()
	CheckError(err)
	fmt.Printf("Total rows/record affected %v", rowsAffected)
	return rowsAffected

}

// O Company vlepei oles tis intership se anamoni apo fitites
func GetallwaitingCompanyIntership(company_id string) []models.Match {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()
	var matchs []models.Match
	getallrequestedinterships := ` SELECT  intership.intership_id,intership.company_id,
	intership.titleposition,intership.filedofintership,intership.employer,intership.fieldofstudies,
	intership.jobposition,intership.informationcompany,intership.infointership,intership.salary,intership.jobtype,
	intership.postingdate,intership.startdate,student.student_id,student.firstname,student.lastname,student.grade,
	student.university,student.yearstudy,student.address,student.telephone

	FROM "intership", "student_intership","student" WHERE 
	intership.company_id=$1 AND 
	intership.intership_id=student_intership.intership_id AND student_intership.student_id=student.student_id AND
	student_intership.flag_answer_accept=$2 AND student_intership.flag_accept=$3 AND student_intership.flag_reject=$4;`
	rows, err := db.Query(getallrequestedinterships, company_id, true, false, false)
	//CheckError(err)
	if err != nil {
		return matchs
	}
	//vres oli tin pliroforia tou kathe intership_id gia ton student_id
	defer rows.Close()
	for rows.Next() {
		var match models.Match
		err2 := rows.Scan(&match.INTERSHIP_ID, &match.COMPANY_ID, &match.TITLE, &match.FILE, &match.EMPLOYER, &match.STUDIES, &match.POSISION, &match.INFOCOMP, &match.INFOINTER, &match.SALARY, &match.JOBTYPE, &match.POSTDATE, &match.STARTDATE, &match.STUDENT_ID, &match.FIRSTNAME, &match.LASTNAME, &match.GRADE, &match.UNIVERSITY, &match.YEAR, &match.EMAIL, &match.TELEPHONE)
		CheckError(err2)
		matchs = append(matchs, match)
	}
	return matchs
}

// O Company pairneis oles tis antistixismenes interships accept kai apo tous duo OK
func GetallmatchedCompanyIntership(company_id string) []models.Match {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()
	var matchs []models.Match
	getallrequestedinterships := ` SELECT  intership.intership_id,intership.company_id,
	intership.titleposition,intership.filedofintership,intership.employer,intership.fieldofstudies,
	intership.jobposition,intership.informationcompany,intership.infointership,intership.salary,intership.jobtype,
	intership.postingdate,intership.startdate,student.student_id,student.firstname,student.lastname,student.grade, 
	student.university,student.yearstudy,student.address,student.telephone

	FROM "intership", "student_intership","student" WHERE 
	intership.company_id=$1 AND 
	intership.intership_id=student_intership.intership_id AND student_intership.student_id=student.student_id AND
	student_intership.flag_answer_accept=$2 AND student_intership.flag_accept=$3;`
	rows, err := db.Query(getallrequestedinterships, company_id, true, true)
	//CheckError(err)
	if err != nil {
		return matchs
	}
	//vres oli tin pliroforia tou kathe intership_id gia ton student_id
	defer rows.Close()
	for rows.Next() {
		var match models.Match
		err2 := rows.Scan(&match.INTERSHIP_ID, &match.COMPANY_ID, &match.TITLE, &match.FILE, &match.EMPLOYER, &match.STUDIES, &match.POSISION, &match.INFOCOMP, &match.INFOINTER, &match.SALARY, &match.JOBTYPE, &match.POSTDATE, &match.STARTDATE, &match.STUDENT_ID, &match.FIRSTNAME, &match.LASTNAME, &match.GRADE, &match.UNIVERSITY, &match.YEAR, &match.EMAIL, &match.TELEPHONE)
		CheckError(err2)
		matchs = append(matchs, match)
	}
	return matchs
}

// O Student pairnei tin antistixismeni kai klismeni praktiki tou askisi OK
func GetmatchedStudentIntership(student_id string) models.Intership {
	// create the postgres db connection
	db := createConnection()
	// close the db connection
	defer db.Close()

	var inter models.Intership

	getallstudentinterships := ` SELECT "intership_id" FROM "student_intership" WHERE "student_id"=$1 AND "flag_request"=$2 AND "flag_answer_accept"=$3 AND "flag_accept"=$4 ` //pinakas me inter_id tou student_id
	row := db.QueryRow(getallstudentinterships, student_id, true, true, true)
	//defer row.Close()
	var intership_id string
	err := row.Scan(&intership_id)
	fmt.Printf("Found a single record %s\n", intership_id)
	//CheckError(err)
	getStmt := `SELECT * FROM "intership" WHERE "intership_id"=$1`
	row2 := db.QueryRow(getStmt, intership_id)
	row2.Scan(&inter.INTERSHIP_ID, &inter.COMPANY_ID, &inter.TITLE, &inter.FILE, &inter.EMPLOYER, &inter.STUDIES, &inter.POSISION, &inter.INFOCOMP, &inter.INFOINTER, &inter.SALARY, &inter.JOBTYPE, &inter.POSTDATE, &inter.STARTDATE, &inter.FLAG_SAVE, &inter.FLAG_ONLINE)
	//CheckError(err2)
	if err == nil {
		return inter
	}
	var emptyinter models.Intership
	return emptyinter

}
