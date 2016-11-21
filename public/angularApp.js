/*    'btford.socket-io'   */

var app = angular.module("VoteApp", ['angularCharts', 'btford.socket-io']);

//This will/must be used if you are using OpenShift for hosting
/*function openShiftSocket(socketFactory,$location){
 var server =  $location.protocol() + "://" + $location.host()+":8000";
 var io_socket = io.connect(server);
 var socket = socketFactory({
 ioSocket: io_socket
 });
 return socket;
 }
 */
app.factory("mySocket", function (socketFactory) {
    return socketFactory();
})

app.controller("VoteCtrl", function ($scope, mySocket) {


    $scope.vote = function (val) {
        var vote = {value: val};
        mySocket.emit("vote", vote);

    }

    mySocket.on("update",function(res){
       $scope.votes.data[0].y = res;

    });
    //Do not focus on this part. Its just to set up the charts
    //https://github.com/chinmaymk/angular-charts/
    $scope.config = {
        title: 'Chose your next President', // chart title. If this is false, no title element will be created.
        tooltips: true,
        labels: true, // labels on data points
        colors: ["green", "red"],
        legend: {
            display: true,
            position: 'left',
        },
        isAnimate: true, // run animations while rendering chart
    };

    $scope.votes = {
        data: [{
            x: "Series1",
            y: [0, 0]
        }]
    };
});
