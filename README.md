# Atlas-Find-Intern
A website that helps students, companies, and universities to connect among them in order to complete internships.


BACK END 

Δημιουργήσαμε 4 αρχεία και την Main ώστε να γίνεται η διαδικασία επικοινωνίας με την βάση δεδομένων και να μας επιστρέφει τα επιθυμητά αποτελέσματα

- Το αρχείο router.go περιέχει όλα τα διαφορετικά paths που θα σταλούν τα αιτήματα προς την βάση καθώς και την μορφή του αιτήματος που μπορεί να είναι
POST για Create ενέργεια , PUT για Update ενέργεια , Delete για Delete ενέργεια και Get για Get ενέργεια. Μόλις σταλεί κάποιο αίτημα προχωράμε στο αρχείο
handlers.go

-Το αρχείο handlers.go περιέχει το μεταβατικό στάδειο του αιτήματος. Αποκωδικοποιεί τις πληροφορίες που δέχεται ελέγχει την μέθοδο που δέχεται καλεί τις συναρτήσεις
που θα φορτώσουν τις απαντήσεις και στο τέλος Κωδικοποιεί τα αποτελέσματα για να στείλει πίσω . Για τα αιτήματα :
-POST έχουν φτιαχτεί CreateStudent που δημιουργεί έναν φοιτητή , CreateCompany που δημιουργεί μια εταιρεία , CreateIntership που δημιουργεί μια πρακτική άσκηση ,
RelateIntershipWithStudent που δημιουργεί μια σχέση αποθήκευσης είτε αιτήματος μιας πρακτικής άσκησης με έναν φοιτητή ,SignInStudent ,SignInCompany που
γίνεται η σύνδεση σε λογαριασμό .
-GET έχουν φτιαχτεί GetAllSavedStudentIntership που ο φοιτητής παίρνει όλες τις αποθηκευμένες πρακτικές ασκήσεις , GetAllRequestedStudentIntership που ο φοιτητής 
παίρνει όλες τις πρακτικές ασκήσεις που έχει στείλει αίτημα , GetAllAcceptedStudentIntership που ο φοιτητής παίρνειόλες τις πρακτικές ασκήσεις που τον έχουν
αποδεχτεί , GetAllRejectedStudentIntership που ο φοιτητής παίρνει όλες τις πρακιτκές ασκήσεις που τον έχουν απορρίψει , GetIntership που επιστρέφεται μια πρακτική
άσκηση , GetAllIntership που επιστρέφονται όλες οι online πρακτικές ασκήσεις , GetAllIntershipByCrit που επιστρέφονται όλες οι δημοσιευμένες πρακτικές ασκήσεις 
ανάλογα με ένα κριτίριο ,GetAllSavedCompanyIntership που η εταιρεία παίρνει όλες τις αποθηκευμένες πρακτικές ασκήσεις της , GetAllOnlineCompanyIntership που η 
εταιρεία παίρνει όλες τις δημοσιευμένες πρακτικές ασκήσεις της , GetAllRequestedInterships που η εταιρεία παίρνει όλες τις πρακτικές ασκήσεις που έχει δεχτεί αίτημα
από φοιτητές ,GetAllRequestCompanyIntership που η εταιρεία παίρνει όλους τους φοιτητές που έχουν στείλει αίτημα για μια συγκεκριμένη πρακτική άσκηση ,
GetAllMatchedInterships που η εταιρεία παίρνει όλες τις πρακτικές ασκήσεις και τους φοιτητές που τους έχει κάνει αποδοχή και αυτοί κάναν αποδοχή πίσω ,
GetAllWaitingInterships που η εταιρεία παίρνει όλες τις πρακτικές ασκήσεις και τους φοιτητές που τους έχει αποδεχτεί αλλά αυτοί δεν έχουν δώσει το τελικο οκ,
GetStudentMatchedIntership, όπου οι φοιτητέ παίρνουν την αντιστοιχησμένη πρακτική τουε άσκηση .
-UPDATE έχουν φτιαχτεί  UpdateStudentIntership ο φοιτητήε επεξεργάζεται μια αποθηκευμένη πρακτική του άσκηση , UpdateCompanyIntership η εταιρεία επεξεργάζεται μια
αποθηκευμένη πρακτική άσκηση , UpdateCompanyAcceptStudentIntership η εταιρεία αποδέχεται έναν φοιτητή σε μια πρακτικά άσκηση , UpdateCompanyRejectStudentIntership
η εταιρεία απορρίπτει έναν φοιτητή απο μια πρακτική άσκηση,UpdateStudentAcceptDeal ο φοιτητής αποδέχεται από μεριάς του το ιδιωτικό συμφωνιτικό ,
UpdateStudentRejectDeal ο φοιτητής απορρίπτει το ιδιωτικό συμφωνιτικό 
-DELETE CompanyDeleteIntership η εταιρεία διαγράφει μια αποθηκευμένη πρακτική άσκηση , StudentDeleteIntership ο φοιτητής διαγράφει μια αποθηκευμένη πρακτική άσκηση

-Το αρχείο functions.go έχει όλες τις συναρτήσεις που υλοποιούν τα παραπάνω αιτήματα και τα επιστρέφει στο αρχείο handlers.go . Οι συναρτήσεις επικοινωνούν με την βάση
και μέ slq queries παίρνουν τις πληροφορίες που θέλουν . Σε αυτό το αρχείο γίνεται η σύνδεση με την βάση δεδομένων . 

-Το αρχείο models.go περιέχει όλες τις δομές που είναι απαραίτητες για τις παραπάνω πληροφορίες , υπάρχει μια δομή για τον φοιτητή , μια δομή για  την εταιρεία , 
μια δομή
για την σχέση του φοιτητή με πρακτική άσκηση μια δομή για την πρακτική άσκηση και μια δομή για επιστροφή αποτελεσμάτων. 

DATABASE: postgres, you need create database and you have to  import your creadential  from your database in order to have connect golang backend with postgres server.

Run: 1. cd Back-end Atlas
2. go run main.go


#Front end
I use Javascript and React.js with Parcel bundler in order to create the Front-End side. Inside the client, I have a directory src which is the main part of my code. The main contains of src directory is my components Internship, Student, Companies, Home which create the main part of my app interface with necessary style and fetches of data. In addition, the scr directory have cssin the directory style. Also, I have the function paginate(https://www.zacfukuda.com/blog/pagination-algorithm) inside the functions' directory.

if you have clone the repository: ##Run:
 cd client
 npm install
 npm run dev
run in your Browser: http://localhost:1234

Dependencies : download Node
