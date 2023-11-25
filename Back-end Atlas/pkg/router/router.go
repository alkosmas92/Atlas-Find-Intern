package router

import (
	"go-postgres/pkg/middleware"

	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/signin_student", middleware.GetSignInStudent).Methods("POST", "OPTIONS") // o student kanei sign in
	router.HandleFunc("/api/signin_company", middleware.GetSignInCompany).Methods("POST", "OPTIONS") // o company kanei sign in

	router.HandleFunc("/api/newstudent", middleware.CreateStudent).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/newcompany", middleware.CreateCompany).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/newintership/{id}", middleware.CreateIntership).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/relate_student_intership/{id}", middleware.RelateIntershipWithStudent).Methods("POST", "OPTIONS")      // o student kanei energia se intership
	router.HandleFunc("/api/save_student_intership/{id}", middleware.GetAllSavedStudentIntership).Methods("GET", "OPTIONS")        // o student vlepei oles tis saved interships
	router.HandleFunc("/api/request_student_intership/{id}", middleware.GetAllRequestedStudentIntership).Methods("GET", "OPTIONS") // o student vlepei oles tis requested interships
	router.HandleFunc("/api/accept_student_intership/{id}", middleware.GetAllAcceptedStudentIntership).Methods("GET", "OPTIONS")   // o student vlepei oles tis accepted interships
	router.HandleFunc("/api/reject_student_intership/{id}", middleware.GetAllRejectedStudentIntership).Methods("GET", "OPTIONS")   // o student vlepei oles tis rejected interships

	router.HandleFunc("/api/relateintership/{id}", middleware.GetAllRelatetudentIntership).Methods("GET", "OPTIONS") // o student vlepei oles tis rejected interships

	router.HandleFunc("/api/check_student_intership/{stud_id}", middleware.CheckStudentIntership).Methods("POST", "OPTIONS")

	router.HandleFunc("/api/intership/{inter_id}", middleware.GetIntership).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/all_interships", middleware.GetAllIntership).Methods("GET", "OPTIONS")                             // o student vlepei oles tis online interships
	router.HandleFunc("/api/all_critirio_interships/{critirio}", middleware.GetAllCritirioIntership).Methods("GET", "OPTIONS") // o student vlepei oles tis interships analoga me ena kritirio
	router.HandleFunc("/api/all_interships_bycrit", middleware.GetAllIntershipByCrit).Methods("POST", "OPTIONS")               // o student vlepei oles tis interships analoga me ena kritirio

	router.HandleFunc("/api/saved_company_intership/{id}", middleware.GetAllSavedCompanyIntership).Methods("GET", "OPTIONS")                     //o Company pairnei oles tis apothikevmenes interships
	router.HandleFunc("/api/online_company_intership/{id}", middleware.GetAllOnlineCompanyIntership).Methods("GET", "OPTIONS")                   //o Company pairnei oles tis dimosieumenes interships
	router.HandleFunc("/api/company_requested_interships/{id}", middleware.GetAllRequestedInterships).Methods("GET", "OPTIONS")                  //o Company pairnei oles tis interships pou dextikan aitisis
	router.HandleFunc("/api/request_company_intership/{comp_id}/{inter_id}", middleware.GetAllRequestCompanyIntership).Methods("GET", "OPTIONS") //o Company pairnei oles tis aitisis gia mia intership

	router.HandleFunc("/api/update_student_intership/{id}", middleware.UpdateStudentIntership).Methods("PUT", "OPTIONS")                                                              // o student kanei update tin intership
	router.HandleFunc("/api/update_company_intership/{id}", middleware.UpdateCompanyIntership).Methods("PUT", "OPTIONS")                                                              // o Company kanei update tin intership
	router.HandleFunc("/api/update_company_accept_student_intership/{comp_id}/{intership_id}/{student_id}", middleware.UpdateCompanyAcceptStudentIntership).Methods("PUT", "OPTIONS") // o Company kanei update-accept to request Student gia Intership
	router.HandleFunc("/api/update_company_reject_student_intership/{comp_id}/{intership_id}/{student_id}", middleware.UpdateCompanyRejectStudentIntership).Methods("PUT", "OPTIONS") // o Company kanei update-reject to request Student gia Intership

	router.HandleFunc("/api/stud_accept_deal/{stud_id}/{inter_id}", middleware.UpdateStudentAcceptDeal).Methods("PUT", "OPTIONS")    //O Student kanei accept to simfwnitiko
	router.HandleFunc("/api/stud_update_request/{stud_id}/{inter_id}", middleware.UpdateStudentAcceptDeal).Methods("PUT", "OPTIONS") //O Student kanei accept to simfwnitiko
	router.HandleFunc("/api/stud_reject_deal/{stud_id}/{inter_id}", middleware.UpdateStudentRejectDeal).Methods("PUT", "OPTIONS")    //O Student kanei reject to simfwnitiko
	router.HandleFunc("/api/stud_request_deal/{stud_id}/{inter_id}", middleware.UpdateStudentRequest).Methods("PUT", "OPTIONS")      //O Student kanei reject to simfwnitiko

	router.HandleFunc("/api/company_delete_intership/{id}", middleware.CompanyDeleteIntership).Methods("DELETE", "OPTIONS")                        //O Company kanei delete mia apothikevmeni intership
	router.HandleFunc("/api/student_delete_intership/{student_id}/{intership_id}", middleware.StudentDeleteIntership).Methods("DELETE", "OPTIONS") //O Student kanei delete mia apothikevmeni i ekremmis intership

	//MENEI
	router.HandleFunc("/api/company_matched_interships/{id}", middleware.GetAllMatchedInterships).Methods("GET", "OPTIONS") //o Company pairnei oles tis interships pou eklisan
	router.HandleFunc("/api/company_waiting_interships/{id}", middleware.GetAllWaitingInterships).Methods("GET", "OPTIONS") //o Company pairnei oles tis interships pou o foititis prp na apantisi

	//O Ergodotis vlepei oles tis antistixismenes theseis me Students 1-2
	// O Company vlepei oles tis se anamoni apo fititi

	router.HandleFunc("/api/student_matched_intership/{stud_id}", middleware.GetStudentMatchedIntership).Methods("GET", "OPTIONS") //o Company pairnei oles tis interships pou eklisan

	return router
}
