package controllers

import com.fasterxml.jackson.databind.ObjectMapper
import javax.inject._
import play.api.libs.json.Json
import play.api.mvc._
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import models.person

import scala.collection.mutable.ListBuffer

@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def appSummary = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed!"))
  }

  case class Input(inputType : String, Name : String, label : String, prop: Map[String,String] = Map());

  var city = Map(""->"", "nvs"->"Navsari","abd"->"Ahemdabad","rj"->"Rajkot");
  var hobbies = Map(""->"", "dance"->"dance","abd"->"abd","rj"->"rj");
  var gender = Map("male"->"Male","female"->"Female","other"->"Other");
  var lang = Map("en"->"English","gj"->"Gujarati", "hi"->"Hindi");

  var metadata = List(
    Input("text","name","Name",Map("placeholder"->"Enter the Name")),
    Input("number","age","Age",Map("min"->"0","max"->"100")),
    Input("password","pass","Password", Map("required"->"1")),
    Input("radio","gender","Gender",Map("option"-> Json.stringify(Json.toJson(gender)))),
    Input("email","email","Email"),
    Input("checkbox","lang","Language",Map("option"-> Json.stringify(Json.toJson(lang)))),
    Input("number","height","Height", Map("step"->"0.01", "min"->"0", "max"->"10", "placeholder"->"1.0")),
    Input("number","weight","Weight", Map("step"->"0.001", "min"->"0", "max"->"500", "placeholder"->"63.54")),
    Input("textarea","info","Info"),
    Input("select-multiple","hobbies","Hobbies",Map("option"-> Json.stringify(Json.toJson(hobbies)))),
    Input("select","city","City",Map("option"-> Json.stringify(Json.toJson(city)))),    
    Input("Submit","Submit","",Map("value"->"Submit", "className"->"btn btn-warning "))
  )

  def renderForm = Action{
    val mapper = new ObjectMapper()
    mapper.registerModule(DefaultScalaModule)
    Ok(mapper.writeValueAsString(metadata))
  }

  def test = Action(parse.json){ implicit request =>
    var hobbies = (request.body \ "hobbies").asOpt[List[String]].getOrElse(List.empty)
    var name  = (request.body \ "name").asOpt[String].getOrElse("")
    var age = (request.body \ "age").asOpt[String].getOrElse("")
    var pass = (request.body \ "pass").asOpt[String].getOrElse("")
    var email = (request.body \ "email").asOpt[String].getOrElse("")
    var city = (request.body \ "city").asOpt[String].getOrElse("")
    var height = (request.body \ "height").asOpt[String].getOrElse("")
    var weight = (request.body \ "weight").asOpt[String].getOrElse("")
    var lang = (request.body \ "lang").asOpt[List[String]].getOrElse(List.empty)
    var gender = (request.body \ "gender").asOpt[String].getOrElse("")
    var info = (request.body \ "info").asOpt[String].getOrElse("")

    person.createUser(name, age, pass, email, city, height, hobbies.toString(), weight, gender, lang.toString, info);

    val mapper = new ObjectMapper()
    mapper.registerModule(DefaultScalaModule)

    Ok(mapper.writeValueAsString(person.get))

  }
/**
  def submitForm = Action {
    implicit req =>

      req.body.asJson.map{ data =>
        var name = data("name").as[String] ;
        var age = data("age").as[String];
        var pass = data("pass").as[String];
        var email = data("email").as[String];
        var city = data("city").as[String];
        var height = data("height").as[String];
        var weight = data("height").as[String];
        print(data("hobbies"));
        var hobbies = List("ya","na"); //data("hobbies").as[List[String]];


        person.createUser(name,age,pass,email,city,height,hobbies.toString(),weight );
      }
      val mapper = new ObjectMapper()
      mapper.registerModule(DefaultScalaModule)

      Ok(mapper.writeValueAsString(person.get))
  }
*/
  def getData = Action{
    val mapper = new ObjectMapper();
    mapper.registerModule(DefaultScalaModule);
    Ok(mapper.writeValueAsString(person.get))
  }
}

