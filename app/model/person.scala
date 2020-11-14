package models

object person {
    var data : List[Map[String,String]] = List[Map[String,String]](Map(
                                                                        "name"->"Name",
                                                                        "age"->"Age",
                                                                        "pass"->"Password",
                                                                        "email"->"Email",
                                                                        "city"->"City",
                                                                        "height"->"Height",
                                                                        "hobbies"->"Hobbies",
                                                                        "weight"-> "Weight",
                                                                        "gender"-> "Gender",
                                                                        "lang"-> "Langauge",
                                                                        "info" -> "Info"
                                                                        )
                                                                    );

    def createUser(
        name : String , 
        age : String , 
        pass : String , 
        email : String, 
        city : String, 
        height : String, 
        hobbies: String, 
        weight : String,
        gender : String,
        lang : String,
        info : String   ) : Boolean = {
        data = data.take(1) ++ List(Map(
            "name"->name, 
            "age"->age, 
            "pass"->pass, 
            "email"->email, 
            "city"->city, 
            "height" -> height, 
            "hobbies" -> hobbies, 
            "weight" -> weight,
            "gender" -> gender,
            "lang" -> lang,
            "info" -> info
            )) ++ data.drop(1);
        true;
    }

    def get : List[Map[String,String]]  = data
}