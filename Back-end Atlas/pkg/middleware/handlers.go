package middleware

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/google/uuid"
	"go-postgres/pkg/models"

	"go-postgres/pkg/functions"

	//"os"
	//"strconv"

	"github.com/gorilla/mux"

	//"github.com/joho/godotenv"
	_ "github.com/lib/pq" // postgres golang driver
)

type response struct {
	ID      uuid.UUID `json:"id,omitempty"`
	Message string    `json:"message,omitempty"`
}

// OK
func CreateStudent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	print("The method is used is\n", r.Method)
	if r.Method == "POST" {
		var student models.Student
		err := json.NewDecoder(r.Body).Decode(&student)
		if err != nil {
			log.Fatalf("Unable to decode the request body.  %v", err)
		}
		student.STUDENT_ID = uuid.New()
		insertID := functions.InsertStudent(student)
		res := response{
			ID:      insertID,
			Message: "User created successfully",
		}

		json.NewEncoder(w).Encode(res)
	}

}

// OK
func CreateCompany(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "POST" {
		var company models.Company

		err := json.NewDecoder(r.Body).Decode(&company)
		if err != nil {
			log.Fatalf("Unable to decode the request body.  %v", err)
		}
		company.COMPANY_ID = uuid.New()
		insertID := functions.InsertCompany(company)
		res := response{
			ID:      insertID,
			Message: "User created successfully",
		}

		json.NewEncoder(w).Encode(res)
	}

}

// OK
func CreateIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "POST" {
		params := mux.Vars(r)
		//comp_id, err := strconv.Atoi(params["id"])
		var comp_id string = params["id"]

		//if err != nil {
		//	log.Fatalf("Unable to convert the string into int.  %v", err)
		//}

		var intership models.Intership
		err2 := json.NewDecoder(r.Body).Decode(&intership)
		if err2 != nil {
			log.Fatalf("Unable to decode the request body.  %v", err2)
		}
		intership.COMPANY_ID, _ = uuid.Parse(comp_id)
		intership.INTERSHIP_ID = uuid.New()
		insertID := functions.InsertIntership(intership)
		res := response{
			ID:      insertID,
			Message: "User created successfully",
		}

		json.NewEncoder(w).Encode(res)
	}

}

// O Student apothikevi mia Intership i kanei request. To student_id apo link OK
func RelateIntershipWithStudent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "POST" {
		params := mux.Vars(r)
		var stud_id string = params["id"]

		var relate_student_intership models.Relate_Student_Intership
		err2 := json.NewDecoder(r.Body).Decode(&relate_student_intership)
		if err2 != nil {
			log.Fatalf("Unable to decode the request body.  %v", err2)
		}
		relate_student_intership.STUDENT_ID, _ = uuid.Parse(stud_id)
		insertID := functions.Insert_Relate_Student_Intership(relate_student_intership)
		res := response{
			ID:      insertID,
			Message: "User created successfully",
		}

		json.NewEncoder(w).Encode(res)
	}
}

// O Student stelnei username kai password gia na sindethi OK
func GetSignInStudent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "POST" {
		var student models.Student
		err := json.NewDecoder(r.Body).Decode(&student)
		if err != nil {
			log.Fatalf("Unable to decode the request body.  %v", err)
		}
		correct_student := functions.GetsigninStudent(student)
		//fmt.Sprintf("The username %s", correct_student.USERNAME)
		//if correct_student.USERNAME == "" {
		//	print("OK ITS NULL")
		//}
		//res := response{
		//	ID:      insertID,
		//	Message: "User created successfully",
		//}

		json.NewEncoder(w).Encode(correct_student)
	}
}

// O Company stelnei username kai password gia na sindethi OK
func GetSignInCompany(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "POST" {
		var company models.Company
		err := json.NewDecoder(r.Body).Decode(&company)
		if err != nil {
			log.Fatalf("Unable to decode the request body.  %v", err)
		}
		correct_company := functions.GetsigninCompany(company)
		//res := response{
		//	ID:      insertID,
		//	Message: "User created successfully",
		//}

		json.NewEncoder(w).Encode(correct_company)
	}
}

// O Student pairnei oles tis apothikevmenes intership tou . Prepei mono to flag save =true OK
func GetAllSavedStudentIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var student_id string = params["id"]
	//var id2, _ = uuid.Parse(id)
	interships := functions.GetallsavedStudentIntership(student_id)
	//if err2 != nil {
	//	log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(interships)

}

// O Student pairnei oles tis ekremmeis intership p exi stilei request. Prepei mono flag request= true OK
func GetAllRequestedStudentIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var student_id string = params["id"]
	//var id2, _ = uuid.Parse(id)
	interships := functions.GetallrequestedStudentIntership(student_id)
	//if err2 != nil {
	//	log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(interships)
}

// O Student pairnei oles tis intership pou ton exoun apodexti . Prepei flag request kai flag_answer_accept na einai true OK
func GetAllAcceptedStudentIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var student_id string = params["id"]

	interships := functions.GetallacceptedStudentIntership(student_id)
	//if err2 != nil {
	//	log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(interships)
}

// OK
func CheckStudentIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "POST" {
		params := mux.Vars(r)
		var student_id string = params["stud_id"]
		var rsi models.Relate_Student_Intership
		err := json.NewDecoder(r.Body).Decode(&rsi)
		fmt.Printf("%s %s", student_id, rsi.INTERSHIP_ID)
		if err != nil {
			log.Fatalf("Unable to decode the request body. %v", err)
		}
		apantisi := functions.Checkstudentintership(student_id, rsi)
		//if err2 != nil {
		//	log.Fatalf("Unable to decode the request body. %v", err2)
		//}
		json.NewEncoder(w).Encode(apantisi)
	}
}

// O Student pairnei oles tis intership pou efage akiro.Prepei flag request kai flag_answer_reject na einai true OK
func GetAllRejectedStudentIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var student_id string = params["id"]

	interships := functions.GetallrejectedStudentIntership(student_id)
	//if err2 != nil {
	//log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(interships)
}

func GetAllRelatetudentIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var internship_id string = params["id"]

	internships := functions.GetallrelateStudentIntership(internship_id)
	fmt.Printf("intershipole", internships)
	//if err2 != nil {
	//log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(internships)

}

// Epistrofi mias sigekrimenis intership mesw tou id tis OK
func GetIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var intership_id string = params["inter_id"]

	intership := functions.Getintership(intership_id)
	//if err2 != nil {
	//	log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(intership)
}

// Epistrofi olwn twn dimosieumenwn intership prepei to flag_online true OK
func GetAllIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	interships := functions.Getallintership()
	//if err2 != nil {
	//	log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(interships)
}

// Paizi na min xriazetai
func GetAllCritirioIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var employer string = params["critirio"]
	//var intership models.Intership
	//err := json.NewDecoder(r.Body).Decode(&intership)
	//if err != nil {
	//	log.Fatalf("Unable to decode the request body.  %v", err)
	//}
	print("to kritirio", employer)
	interships, err2 := functions.Getallcritiriointership(employer)
	if err2 != nil {
		log.Fatalf("Unable to decode the request body. %v", err2)
	}
	json.NewEncoder(w).Encode(interships)
}

// Epistrofi olwn twn intership flag online me vasi ENA kritirio : Employer, Titlo , Studies, Thesi , Jobtype OK
func GetAllIntershipByCrit(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if r.Method == "POST" {
		//params := mux.Vars(r)
		var intership models.Intership
		err := json.NewDecoder(r.Body).Decode(&intership)
		if err != nil {
			log.Fatalf("Unable to decode the request body.  %v", err)
		}
		if intership.EMPLOYER != "" {
			print("to kritirio einai employer", intership.EMPLOYER)
			interships := functions.GetByEmployerInter(intership.EMPLOYER)
			//if err2 != nil {
			//	log.Fatalf("Unable to decode the request body. %v", err2)
			//}
			json.NewEncoder(w).Encode(interships)
		}
		if intership.TITLE != "" {
			print("to kritirio einai title", intership.TITLE)
			interships := functions.GetByTitleInter(intership.TITLE)
			//if err2 != nil {
			//	log.Fatalf("Unable to decode the request body. %v", err2)
			//}
			json.NewEncoder(w).Encode(interships)
		}
		if intership.STUDIES != "" {
			print("to kritirio einai studies", intership.STUDIES)
			interships := functions.GetByStudiesInter(intership.STUDIES)
			//if err2 != nil {
			//	log.Fatalf("Unable to decode the request body. %v", err2)
			//}
			json.NewEncoder(w).Encode(interships)
		}
		if intership.POSISION != "" {
			print("to kritirio einai posision", intership.POSISION)
			interships := functions.GetByPossisionInter(intership.POSISION)
			//if err2 != nil {
			//	log.Fatalf("Unable to decode the request body. %v", err2)
			//}
			json.NewEncoder(w).Encode(interships)
		}
		if intership.JOBTYPE != "" {
			print("to kritirio einai jobtype", intership.JOBTYPE)
			interships := functions.GetByJobtypeInter(intership.JOBTYPE)
			//if err2 != nil {
			//	log.Fatalf("Unable to decode the request body. %v", err2)
			//}
			json.NewEncoder(w).Encode(interships)
		}
	}

}

// O Company pairnei oles tis intership pou einai flag save true OK
func GetAllSavedCompanyIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var comp_id string = params["id"]

	interships := functions.GetallsavedCompanyIntership(comp_id)
	//if err2 != nil {
	//	log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(interships)
}

// O Company pairnei oles tis intership tou pou einai dimosieumenes, flag online true OK
func GetAllOnlineCompanyIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var comp_id string = params["id"]

	interships := functions.GetallonlineCompanyIntership(comp_id)
	//if err2 != nil {
	//	log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(interships)
}

// O Company pairnei oles tis intership pou exi dexti request OK
func GetAllRequestedInterships(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var comp_id string = params["id"]

	interships := functions.GetallrequestedInterships(comp_id)
	//if err2 != nil {
	//	log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(interships)
}

// O Company pairnei olous tous students pou exoun kanei aitisi gia mia sigekrimeni intership. Flag Request= true kai denexi apantisei OK
func GetAllRequestCompanyIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var comp_id string = params["comp_id"]
	var inter_id string = params["inter_id"]

	students := functions.GetallrequestCompanyIntership(comp_id, inter_id)
	//if err2 != nil {
	//	log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(students)
}

// O Company kanei delete mia intership tou (mono stis apothikevmenes ginetai) OK
func CompanyDeleteIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS,DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	print("The method is used is\n", r.Method)
	if r.Method == "DELETE" {
		params := mux.Vars(r)
		var intership_id string = params["id"]

		deletedRows := functions.CompanydeleteIntership(intership_id)

		msg := fmt.Sprintf("Intership %s deleted successfully . Total rows affected %v\n", intership_id, deletedRows)
		inter_id, _ := uuid.Parse(intership_id)
		res := response{
			ID:      inter_id,
			Message: msg,
		}
		json.NewEncoder(w).Encode(res)
	}
}

// O Student kanei delete mia intership pou exei stis apothikevmenes tou OK
func StudentDeleteIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS,DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	print("The method is used is\n", r.Method)
	if r.Method == "DELETE" {
		params := mux.Vars(r)
		var student_id string = params["student_id"]
		var intership_id string = params["intership_id"]
		deletedRows := functions.StudentdeleteIntership(student_id, intership_id)
		msg := fmt.Sprintf("Intership %s deleted successfully . Total rows affected %v\n", intership_id, deletedRows)
		inter_id, _ := uuid.Parse(intership_id)
		res := response{
			ID:      inter_id,
			Message: msg,
		}
		json.NewEncoder(w).Encode(res)
	}
}

// O Student kanei update mia apothikevmeni intership tou OK
func UpdateStudentIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS,PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	print("The method is used is\n", r.Method)
	if r.Method == "PUT" {
		params := mux.Vars(r)                //pare ta stixia
		var student_id string = params["id"] //pare to id tou student
		var relate_student_intership models.Relate_Student_Intership
		err2 := json.NewDecoder(r.Body).Decode(&relate_student_intership)
		if err2 != nil {
			log.Fatalf("Unable to decode the request body.  %v", err2)
		}
		updatedRows := functions.Updatestudentintership(relate_student_intership, student_id)
		msg := fmt.Sprintf("User updated successfully. Total rows/record affected %v", updatedRows)
		var std, _ = uuid.Parse(student_id)
		fmt.Printf("Student id %s %s\n", std, student_id)
		res := response{
			ID:      std,
			Message: msg,
		}

		json.NewEncoder(w).Encode(res)
	}
}

// O Company kanei Update to apothikevmeno intership tou , to ksanakanei save i to dimosieuvi OK
func UpdateCompanyIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS,PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	print("The method is used is\n", r.Method)
	if r.Method == "PUT" {
		params := mux.Vars(r)                //pare ta stixia
		var company_id string = params["id"] //pare to id tou student

		var intership models.Intership
		err2 := json.NewDecoder(r.Body).Decode(&intership)
		if err2 != nil {
			log.Fatalf("Unable to decode the request body.  %v", err2)
		}

		updatedRows := functions.Updatecompanyintership(intership, company_id)
		msg := fmt.Sprintf("User updated successfully. Total rows/record affected %v", updatedRows)

		var cmp, _ = uuid.Parse(company_id)
		fmt.Printf("Student id %s %s\n", cmp, company_id)
		res := response{
			ID:      cmp,
			Message: msg,
		}

		json.NewEncoder(w).Encode(res)
	}

}

// O Company kanei accept ton student se mia intership , o student eixe stilei prin aitima kai enimerwnete OK
func UpdateCompanyAcceptStudentIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS,PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	print("The method is used is\n", r.Method)
	if r.Method == "PUT" {
		params := mux.Vars(r)                     //pare ta stixia
		var company_id string = params["comp_id"] //pare to id tou student
		var intership_id string = params["intership_id"]
		var student_id string = params["student_id"]

		//var intership models.Intership
		//err2 := json.NewDecoder(r.Body).Decode(&intership)
		//if err2 != nil {
		//	log.Fatalf("Unable to decode the request body.  %v", err2)
		//}

		updatedRows := functions.Updatecompanyacceptstudentintership(company_id, intership_id, student_id)
		msg := fmt.Sprintf("User updated successfully. Total rows/record affected %v", updatedRows)

		var cmp, _ = uuid.Parse(company_id)
		fmt.Printf("Student id %s %s\n", cmp, company_id)
		res := response{
			ID:      cmp,
			Message: msg,
		}
		json.NewEncoder(w).Encode(res)
	}

}

// O Company kanei reject ton student se mia intership , o student eixe stilei prin aitima kai enimerwnete OK
func UpdateCompanyRejectStudentIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS,PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	print("The method is used is\n", r.Method)
	if r.Method == "PUT" {
		params := mux.Vars(r)                     //pare ta stixia
		var company_id string = params["comp_id"] //pare to id tou student
		var intership_id string = params["intership_id"]
		var student_id string = params["student_id"]

		//var intership models.Intership
		//err2 := json.NewDecoder(r.Body).Decode(&intership)
		//if err2 != nil {
		//	log.Fatalf("Unable to decode the request body.  %v", err2)
		//}

		updatedRows := functions.Updatecompanyrejectstudentintership(company_id, intership_id, student_id)
		msg := fmt.Sprintf("User updated successfully. Total rows/record affected %v", updatedRows)

		var cmp, _ = uuid.Parse(company_id)
		fmt.Printf("Student id %s %s\n", cmp, company_id)
		res := response{
			ID:      cmp,
			Message: msg,
		}
		json.NewEncoder(w).Encode(res)
	}

}

// O Student apodexetai to deal pou ton exi apodexti o Company OK
func UpdateStudentAcceptDeal(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS,PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	print("The method is used is\n", r.Method)
	if r.Method == "PUT" {
		params := mux.Vars(r)                     //pare ta stixia
		var student_id string = params["stud_id"] //pare to id tou student
		var intership_id string = params["inter_id"]
		updatedRows := functions.Updatestudentacceptdeal(student_id, intership_id)
		msg := fmt.Sprintf("User updated successfully. Total rows/record affected %v", updatedRows)
		var cmp, _ = uuid.Parse(student_id)
		fmt.Printf("Student id %s %s\n", cmp, student_id)
		res := response{
			ID:      cmp,
			Message: msg,
		}
		json.NewEncoder(w).Encode(res)
	}
}

func UpdateStudentRequest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS,PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	print("The method is used is\n", r.Method)
	if r.Method == "PUT" {
		params := mux.Vars(r)                     //pare ta stixia
		var student_id string = params["stud_id"] //pare to id tou student
		var intership_id string = params["inter_id"]
		updatedRows := functions.UpdateStudentRequest(student_id, intership_id)
		msg := fmt.Sprintf("User updated successfully. Total rows/record affected %v", updatedRows)
		var cmp, _ = uuid.Parse(student_id)
		fmt.Printf("Student id %s %s\n", cmp, student_id)
		res := response{
			ID:      cmp,
			Message: msg,
		}
		json.NewEncoder(w).Encode(res)
	}
}

// O Student kanei reject to deal pou ton exi apodexti o Company OK
func UpdateStudentRejectDeal(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "OPTIONS,PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	print("The method is used is\n", r.Method)
	if r.Method == "PUT" {
		params := mux.Vars(r)                     //pare ta stixia
		var student_id string = params["stud_id"] //pare to id tou student
		var intership_id string = params["inter_id"]
		updatedRows := functions.Updatestudentrejectdeal(student_id, intership_id)
		msg := fmt.Sprintf("User updated successfully. Total rows/record affected %v", updatedRows)
		var cmp, _ = uuid.Parse(student_id)
		fmt.Printf("Student id %s %s\n", cmp, student_id)
		res := response{
			ID:      cmp,
			Message: msg,
		}
		json.NewEncoder(w).Encode(res)
	}
}

// O Company pairnei olous tous antistixismenous kai apo tis duo meries OK
func GetAllMatchedInterships(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var comp_id string = params["id"]

	matchs := functions.GetallmatchedCompanyIntership(comp_id)
	//if err2 != nil {
	//	log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(matchs)
}

// O Company pairnei olous tous antistixismenous apo auton alla se anamoni apo fititi OK
func GetAllWaitingInterships(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var comp_id string = params["id"]

	matchs := functions.GetallwaitingCompanyIntership(comp_id)
	//if err2 != nil {
	//	log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(matchs)
}

// O Student pairnei tin matched intership tou OK
func GetStudentMatchedIntership(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var student_id string = params["stud_id"]

	interships := functions.GetmatchedStudentIntership(student_id)
	//if err2 != nil {
	//	log.Fatalf("Unable to decode the request body. %v", err2)
	//}
	json.NewEncoder(w).Encode(interships)
}
