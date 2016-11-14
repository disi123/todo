angular.module('TodoApp.services', [])

/**
 * Factory for returning Data, save one Entry, remove and update Database
 * @param {type} $http
 * @returns {services_L6.servicesAnonym$6}
 */
.factory('Tasks', function($http, URLGetData, URLSave, URLDelete, URLUpdate) {
  
 var task = [];

  return {
    all: function() {
      return $http.get(URLGetData.url);
    },
    saveOneEntrie: function(data){
      return $http.post(URLSave.url + data);
    },
    remove: function(data) {
      return $http.post(URLDelete.url + data);
    },
    update: function(data) {
      return $http.post(URLUpdate.url + data);
    }
  };
});
