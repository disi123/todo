<?php

include("connect.php");
include("Mysql.class.php");
include("MysqlStatement.class.php");


/**
 * DEBUG:
 * echo $MysqlStatement_delete->sql; Anzeige SQL Statement
 */

/* get the mysql object */
$Mysql = new Mysql();

/* get the options */
$option = $_GET["option"];

/* return data */
if ($option == 1) {
  /* settings data if a new version is out there and the std STP ID */
  $sql = "SELECT * FROM Todo";
  $MysqlStatement_select = $Mysql->getMysqlStatement($sql);
  $MysqlStatement_select->execute();

  $data_json = array();
  $data_json_temp = array();
  while ($data_json_select = $MysqlStatement_select->fetchArray()) {
    $data_json_temp["id"] = $data_json_select['id'];
    $data_json_temp["title"] = $data_json_select['text'];
    $data_json_temp["duration"] = $data_json_select['duration'];
    $data_json['task' . $i] = $data_json_temp;
    $i++;
  }

  echo json_encode($data_json);
}
/* save data */
else if ($option == 2) {
  /* insert data */
  if ($_GET["text"] == "undefined" || $_GET["text"] == "") {
    echo "no data input";
  }
  else {
    $sql = "INSERT INTO `Todo` (`text`,`duration`) values (:0, :1)";
    $MysqlStatement_insert = $Mysql->getMysqlStatement($sql);
    $MysqlStatement_insert->execute($_GET["text"], $_GET["duration"]);
    
    /* error */
    if ($MysqlStatement->error != "") {
      echo $MysqlStatement->error_msg;
    }
    else {
      echo "data saved";
    }
  }
}
/* delete data */
else if ($option == 3) {
  if ($_GET["id"] == "undefined" || $_GET["id"]== "") {
    echo "no id specified";
  }
  else {
    $sql = "DELETE FROM `Todo` WHERE id = :0";
    $MysqlStatement_delete = $Mysql->getMysqlStatement($sql);
    $MysqlStatement_delete->execute($_GET["id"]);
    
    /* error */
    if ($MysqlStatement->error != "") {
      echo $MysqlStatement->error_msg;
    }
    else {
      echo "data deleted";
    } 
  }
}
else if ($option == 4) {
  if ($_GET["id"] == "undefined" || $_GET["id"]== "") {
    echo "no id specified";
  }
  else {
    $sql = "UPDATE `Todo` SET `text`=:0,`duration`=:1 WHERE id=:2";
    $MysqlStatement_delete = $Mysql->getMysqlStatement($sql);
    $MysqlStatement_delete->execute($_GET["text"], $_GET["duration"], $_GET["id"]);
    
    /* error */
    if ($MysqlStatement->error != "") {
      echo $MysqlStatement->error_msg;
    }
    else {
      echo "data updated";
    } 
  }
}
else {
  echo "no action specified";
}
?>
