<?php

/**
 * @author Philipp Treffinger
 * @since 0.8 - 10.02.2010
 */
class Mysql {

  /**
   *
   * @var int 
   */
  private $last_num_rows = false;

  /**
   *
   * @var int 
   */
  private $last_insert_id = false;

  /**
   *
   * @var Mysqli 
   */
  private $db_connection = false;

  /**
   * 
   */
  public function __construct() {

    $this->connectToDB();
  }

  /**
   *
   * @param type $name
   * @return type 
   */
  public function __get($name) {

    switch ($name) {
      
      case'last_insert_id':
        return $this->last_insert_id;
        break;

      case'last_num_rows':
        return $this->last_num_rows;
        break;
      
    }
    
  }

  /**
   * 
   */
  public function __destruct() {

    if ($this->db_connection) {
    
      unset($this->db_connection);
      
    }
    
  }

  /**
   *
   * @param type $sql
   * @param type $option
   * @return type 
   */
  public function mysqlExecute($sql, $option = false) {
       
    $query = $this->db_connection->query($sql);
    
    $this->last_num_rows = $query->num_rows;
    $this->last_insert_id = $this->db_connection->insert_id;

    if ($option == 'array') {

      $result = $this->mysqlFetchArray($query);
      return $result;
      
    }

    return $query;
    
  }

  /**
   *
   * @param type $sql
   * @return type 
   */
  public function mysqlExist($sql) {

    $this->mysqlExecute($sql);
    return $this->last_num_rows ? true : false;
  }

  /**
   *
   * @return type 
   */
  private function connectToDB() {

    //$this->db_connection = new mysqli(HOST_NAME, USER_NAME, PASSWORD, DB_NAME);
    
    //mysqli does not accept the port with :
    //$this->db_connection = new mysqli(HOST_NAME, USER_NAME, PASSWORD, DB_NAME, PORT);
    
    $this->db_connection = mysqli_connect(HOST_NAME, USER_NAME, PASSWORD, DB_NAME, PORT);
    
    if (mysqli_connect_errno()) {
      
      die('ERROR 1 -> Mysql::connectToDB() : ' . mysqli_connect_error() . '<br />');
      
    }

    $sql = "SET NAMES 'utf8'";
    $this->db_connection->query($sql);

    return true;
    
  }

  /**
   *
   * @param type $query
   * @return type 
   */
  public function mysqlFetchArray($query) {

    return $query ? $query->fetch_array() : false;
    
  }

  /**
   * 
   * @return MysqlStatement
   */
  public function getMysqlStatement($sql) {

    return new MysqlStatement($this->db_connection, $sql);
    
  }

}

?>
