name :=
    """DynamicForm""".stripMargin
version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala).settings(
  watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

resolvers += Resolver.sonatypeRepo("snapshots")

scalaVersion := "2.12.8"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.2" % Test
libraryDependencies += "com.h2database" % "h2" % "1.4.199"
//libraryDependencies += "net.liftweb" %% "lift-json" % "2.5+"
//libraryDependencies += "org.json4s" % "json4s-xml_2.12" % "3.7.0-M4"
