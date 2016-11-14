angular.module('meinAppName.controllers', [])

.controller('TodoCtrl', function($scope, $ionicModal, Tasks, $ionicListDelegate) {
  
  /* define our tasks */
  $scope.tasks = [];
  
  /* get test data from http server */
  Tasks.all().success(function (response) {
    $scope.tasks = response;
  });
 
  /* Create and load the Modal for a new Entry */
  $ionicModal.fromTemplateUrl('templates/NewTodo.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  /* Called when the form is submitted send data to the server*/
  $scope.createTask = function(task) { 
    
    /* hier ist ein guter Punkt um z.B. Daten online zu speichern */
    Tasks.saveOneEntrie("&text="+task.title + "&duration=" +task.duration).success(function (response) {
      /* get test data from http server */
      Tasks.all().success(function (response) {
        $scope.tasks = response;
      });
      
      /* debug output */
      console.log(response);
    });
    
    $scope.taskModal.hide();
    task.title = "";
    task.duration = "";
  };
 
  /* delete a task */
  $scope.delete = function(id){
    console.log("delete clicked");
    
    /* Daten löschen ... */
    Tasks.remove("&id="+id).success(function (response) {
      
      /* error?*/
      console.log(response);
      
       /* get test data from http server */
      Tasks.all().success(function (response) {
        $scope.tasks = response;
      });
      
      /* userfriendly close option buttons */
      $ionicListDelegate.closeOptionButtons();
    });
  };

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
  
  /* Create and load the Modal to edit an Entry */
  $ionicModal.fromTemplateUrl('templates/EditTodo.html', function(modal) {
    $scope.taskModalEdit = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  /* edit data */
  $scope.edit = function(task){
    console.log("ID: " + task.id + " title: " +task.title + " duration: "+ task.duration);
    
    /* save the vars to the scope */
    $scope.task = task;
    
    $scope.taskModalEdit.show();
  };
  
  /* edit the data */
  $scope.editTodo = function(task){
    console.log("Will update id:" + task.id + " (new)title:" + task.title + " (new)duration:"+task.duration);
    
    Tasks.update("&id="+task.id +"&text="+task.title + "&duration=" +task.duration).success(function (response) {
      /* error? */
      console.log(response);
      
      /* get test data from http server */
      Tasks.all().success(function (response) {
        $scope.tasks = response;
      });
       
      /* reset data */
      task.id = "";
      task.title = "";
      task.duration = "";
      
      /* hide the modal */
      $scope.taskModalEdit.hide();
      
      /* userfriendly close option buttons */
      $ionicListDelegate.closeOptionButtons();
    });
  };
  
   // Close the edit task modal
  $scope.closeNewTaskEdit = function() {
    $scope.taskModalEdit.hide();
  };
});
