		define(['angular', './sample-module'], function (angular, controllers) {
	'use strict';

	// Controller definition
	controllers.controller('BillingRegistryCtrl', ['$scope','$rootScope','$timeout','$window','$state', '$log', 'PredixAssetService', 'PredixViewService', function ($scope,$rootScope,$timeout,$window,$state, $log, PredixAssetService, PredixViewService) {
debugger;

		$("#allbyreqno").show();
		$("#save").hide();
		$("#update").hide();
		$("#cancelAdd").hide();
		$("#cancelup").hide();
		$("#validator").hide();
		$("#note").hide();
		//$("#alert").hide();
		
		
		
		
		/*$rootScope.baseServUrl = "https://cots-services-app.run.aws-usw02-pr.ice.predix.io";*/
		
		 $scope.m = 0;
if($rootScope.userRole == 1){
	document.getElementById("add").className.replace(new RegExp('(?:^|\\s)'+ 'hide' + '(?:\\s|$)'), ' ');
	document.getElementById("edit").className.replace(new RegExp('(?:^|\\s)'+ 'hide' + '(?:\\s|$)'), ' ');
	document.getElementById("delete").className.replace(new RegExp('(?:^|\\s)'+ 'hide' + '(?:\\s|$)'), ' ');
	
	
}else{
	document.getElementById("add").classList.add("hide");
	document.getElementById("edit").classList.add("hide");
	document.getElementById("delete").classList.add("hide");
}
		
        $scope.goback=function(){
        	
        	$state.go('view');
        }


		$scope.billingRegistrySingle = function(){
			var baseUrl = $rootScope.baseServUrl + "/cots/singleBillingRegistry";
			if($rootScope.allbyreqno != null){
				localStorage.setItem("singleReqNo",$rootScope.allbyreqno);
				
			}
			
			
			var data = [];
			$scope.singleReqNo = localStorage.getItem("singleReqNo");
			data.push(localStorage.getItem("singleReqNo"));

			PredixViewService.billingRegistrySingleCall(baseUrl,data,function(data){
				$scope.jsonData  = JSON.stringify(data);
				console.log("JSON DATA::"+$scope.jsonData);
				$scope.totalamnt = 0.00;
				for(var i =0;i<data.length;i++ ){
					//shoporder.push( $scope.rowData[i].row.shoporder.value);
					$scope.totalamnt += data[i].amount;
				}

                     $scope.Total=$scope.totalamnt;
                     
                     //console.log("Before assigining");
				$scope.billingRegistrySingledata=data;
				//console.log("after  assigining");
				$scope.length = $scope.billingRegistrySingledata.length;
				//console.log($(".column-head--selected").text() +" text");
				$(".column-head--selected").text("");
			});
		}
		$scope.billingRegistrySingle();	

		
		
		$scope.custandProduct = function(){
			
			var baseUrl = $rootScope.baseServUrl + "/cots/nameandproduct";
			var data = [];
			
			data.push(localStorage.getItem("singleReqNo"))
			PredixViewService.NameAndProductCall(baseUrl,data,function(data){
				$scope.custName = data.customerName;
				$scope.productNote = data.productNote;
				
    		});
			
			
		}
		$scope.custandProduct();
		
		
		window.keyPressFunc = function(){
			alert("KeyPress Event invoked");
		}
		
		/*$('#editamount').keypress(function(event) {
			alert("Key Press Event");
		}).on('paste', function(event) {
		    event.preventDefault();
		});*/
		
		$scope.k=0;
	$scope.editPaymentLine2 = function(){
		
		
		
		if($scope.k==0 && $scope.l==0)
{		
			$("#update").show();
			$("#cancelup").show();
			$("#note").show();
			document.getElementById("delete").classList.add("fa-disabled");
			$scope.dataIndex = document.getElementById("billingregistry").selectedRows[0].row.dataIndex;
			
			var duedate=document.getElementById("billingregistry").selectedRows[0].row.duedate.value;
		    var fe = document.getElementById("billingregistry").selectedRows[0].row.fe.value;
		    var description=document.getElementById("billingregistry").selectedRows[0].row.description.value;
		    var issuedate=document.getElementById("billingregistry").selectedRows[0].row.issuedate.value;
			var payment=document.getElementById("billingregistry").selectedRows[0].row.payment.value;
			
			var func=document.getElementById("billingregistry").selectedRows[0].row.func.value;
			var amount=document.getElementById("billingregistry").selectedRows[0].row.amount.value;
			var currency=document.getElementById("billingregistry").selectedRows[0].row.currency.value;
			var invoiceno=document.getElementById("billingregistry").selectedRows[0].row.invoiceno.value;
			var shoporder=document.getElementById("billingregistry").selectedRows[0].row.shoporder.value;
			var status=document.getElementById("billingregistry").selectedRows[0].row.status.value;
			var mile=document.getElementById("billingregistry").selectedRows[0].row.mile.value;
			
			
			
			if(fe == "Firm Date"){
				$scope.billingRegistrySingledata[$scope.dataIndex].fe = "<select class='sizebar' id = 'editfe' style = 'width:120px'> <option value = 'Firm Date' selected>Firm Date</option><option value = 'Estimated Date'>Estimated Date</option></select>";
			}
			else{
				$scope.billingRegistrySingledata[$scope.dataIndex].fe = "<select class='sizebar' id = 'editfe' style = 'width:120px'> <option value = 'Firm Date'>Firm Date</option><option value = 'Estimated Date' selected>Estimated Date</option></select>";
			}
			
			if(payment == "Progress"){
				$scope.billingRegistrySingledata[$scope.dataIndex].payment = "<select class='sizebar' id = 'editpayment'> <option value = 'Progress' selected>Progress</option><option value = 'Receivable'>Receivable</option></select>";
			}
			else if(payment == "Receivable"){
				$scope.billingRegistrySingledata[$scope.dataIndex].payment = "<select class='sizebar' id = 'editpayment'> <option value = 'Progress'>Progress</option><option value = 'Receivable' selected>Receivable</option></select>";
			}
		
			$scope.billingRegistrySingledata[$scope.dataIndex].duedate = "<input type = 'date'    id = 'editduedate' style = 'width:143px' value = "+duedate+" class='sizebar1' min='1990-01-01'>";
			$scope.billingRegistrySingledata[$scope.dataIndex].description = "<textarea id = 'editdesc' style = 'width: 148px' rows='1' cols='50' class='sizebar'> "+description+"</textarea>";
			$scope.billingRegistrySingledata[$scope.dataIndex].issuedate = "<input type = 'date' id = 'editissuedate' style = 'width:143px' value = "+issuedate+" class='sizebar1'>";
			
		
			
			if(func == "MFG"){
				$scope.billingRegistrySingledata[$scope.dataIndex].func = "<select class='sizebar' id = 'editfunc'> <option value = 'MFG' selected>MFG</option><option value = 'ENG'>ENG</option><option value = 'SPACE'>SPACE</option></select>";
			}
			else if(func == "ENG"){
				$scope.billingRegistrySingledata[$scope.dataIndex].func = "<select class='sizebar' id = 'editfunc'> <option value = 'MFG'>MFG</option><option value = 'ENG' selected>ENG</option><option value = 'SPACE'>SPACE</option></select>";
			}
			else if(func == "SPACE"){
				$scope.billingRegistrySingledata[$scope.dataIndex].func = "<select class='sizebar' id = 'editfunc'> <option value = 'MFG'>MFG</option><option value = 'ENG'>ENG</option><option value = 'SPACE' selected>SPACE</option></select>";
			}
			
			if(status == "Opened"){
				$scope.billingRegistrySingledata[$scope.dataIndex].status = "<select class='sizebar' id = 'editstatus'> <option value = 'Opened' selected>Opened</option><option value = 'Billed'>Billed</option><option value = 'Collected'>Collected</option></select>";
			}
			else if(status == "Billed"){
				$scope.billingRegistrySingledata[$scope.dataIndex].status = "<select class='sizebar' id = 'editstatus'> <option value = 'Opened'>Opened</option><option value = 'Billed' selected>Billed</option><option value = 'Collected'>Collected</option></select>";
			}
			else if(status == "Collected"){
				$scope.billingRegistrySingledata[$scope.dataIndex].status = "<select class='sizebar' id = 'editstatus'> <option value = 'Opened'>Opened</option><option value = 'Billed'>Billed</option><option value = 'Collected' selected>Collected</option></select>";
			}
			
		
			$scope.billingRegistrySingledata[$scope.dataIndex].amount = "<input id = 'editamount'  type = 'text' value = "+amount+" class='sizebar1'>";
			//<input id = 'editcurrency' type = 'text' style = 'width: 57px' value = "+currency+" class='sizebar'>
			
			if(currency == "USD"){
			$scope.billingRegistrySingledata[$scope.dataIndex].currency = "<select id = 'editcurrency' class = 'sizebar' style = 'width:80px'><option value='USD' selected>USD</option><option value='CND'>CND</option></select>";
			}
			
			else if(currency == "CND"){
				$scope.billingRegistrySingledata[$scope.dataIndex].currency = "<select id = 'editcurrency' class = 'sizebar' style = 'width:80px'><option value='USD' selected>USD</option><option value='CND' selected>CND</option></select>";
			}
			
			$scope.billingRegistrySingledata[$scope.dataIndex].invoiceno = "<input id = 'editinvoiceno' type = 'text' class='sizebar' value = "+invoiceno+">";	
			$scope.billingRegistrySingledata[$scope.dataIndex].shoporder = "<input id = 'editshoporder' type = 'text' class='sizebar' value = "+shoporder+" >";
			$scope.billingRegistrySingledata[$scope.dataIndex].mile = "<input id = 'editmile' type = 'text' min=0 class='sizebar' value = "+mile+">";
			$scope.k=$scope.k+1;
			
			
		}
	

	}


		/*	$scope.nameandProduct = function(){

				var baseUrl = $rootScope.baseServUrl + "/cots/singleBillingRegistry";

				var data = JSON.stringify(localStorage.getItem("singleReqNo"));

				PredixViewService.nameandProductCall(baseUrl,data,function(data){

					console.log(data);
					alert(data);
				});


			}
			$scope.nameandProduct();*/






		//$scope.dropdown = "1";
		//console.log($scope.dropdown);

		//alert(document.getElementById('registry').selectedKey);




		/*    document.getElementById("billingregistry").addEventListener('change', function(e){


    	console.log(JSON.stringify(document.getElementById("billingregistry").selectedRows));

    });*/

/*		$scope.edit = function(){
		
			$scope.selectedRowData = document.getElementById("billingregistry").selectedRows;
			$scope.duedate = $scope.selectedRowData[0].row.duedate.value;
			$scope.description = $scope.selectedRowData[0].row.description.value;
			$scope.fe = $scope.selectedRowData[0].row.fe.value;
			//setting dropdown value for fe
			
			if($scope.fe == "F"){
				 document.getElementById("editfe").options.selectedIndex = 0;
			}
			else{
				document.getElementById("editfe").options.selectedIndex = 1;
			}
			$scope.amount = $scope.selectedRowData[0].row.amount.value;
			$scope.currency = $scope.selectedRowData[0].row.currency.value;
			$scope.status = $scope.selectedRowData[0].row.status.value;
			
			if($scope.status == "Opened"){
				 document.getElementById("editstatus").options.selectedIndex = 0;
			}
			else if($scope.status == "Billed"){
				document.getElementById("editstatus").options.selectedIndex = 1;
			}
			else if($scope.status == "Collected"){
				document.getElementById("editstatus").options.selectedIndex = 2;
			}
			$scope.issuedate = $scope.selectedRowData[0].row.issuedate.value;
			$scope.invoiceno = $scope.selectedRowData[0].row.invoiceno.value;
			$scope.shoporder = $scope.selectedRowData[0].row.shoporder.value;
			$scope.payment = $scope.selectedRowData[0].row.payment.value;
			if($scope.fe == "Progress"){
				 document.getElementById("editpayment").options.selectedIndex = 0;
			}
			else{
				document.getElementById("editpayment").options.selectedIndex = 1;
			}
			$scope.func = $scope.selectedRowData[0].row.func.value;
			
			if($scope.func == "MFG"){
				 document.getElementById("editfunc").options.selectedIndex = 0;
			}
			else if($scope.func == "ENG"){
				document.getElementById("editfunc").options.selectedIndex = 1;
			}
			else if($scope.func == "SPACE"){
				document.getElementById("editfunc").options.selectedIndex = 2;
			}
		



			//alert($scope.selectedRowData[0]);
			//console.log("he llo"+$scope.selectedRowData[0]);

		};*/

	
		document.getElementById("billingregistry").addEventListener('change', function(){


			if(document.getElementById("billingregistry").selectedRows.length == 1){
				
				$scope.l=0;
				
				document.getElementById("edit").removeAttribute("disabled");
				/*document.getElementById("edit").removeClass("fa-disabled");*/
				document.getElementById("edit").className =document.getElementById("edit").className.replace(new RegExp('(?:^|\\s)'+ 'fa-disabled' + '(?:\\s|$)'), ' ');
				document.getElementById("edit").classList.add("ic");
			}else{
				$scope.l=1;
			
				document.getElementById("edit").setAttribute("disabled","true");
				document.getElementById("edit").className =document.getElementById("edit").className.replace(new RegExp('(?:^|\\s)'+ 'ic' + '(?:\\s|$)'), ' ');
				document.getElementById("edit").classList.add("fa-disabled");
				

			}


		});
		document.getElementById("billingregistry").addEventListener('change', function(){

			if(document.getElementById("billingregistry").selectedRows.length > 0){
				$scope.m=1;
				/*document.getElementById("edit").removeClass("fa-disabled");*/
				document.getElementById("delete").className =document.getElementById("delete").className.replace(new RegExp('(?:^|\\s)'+ 'fa-disabled' + '(?:\\s|$)'), ' ');
				document.getElementById("delete").classList.add("ic");
			}else if(document.getElementById("billingregistry").selectedRows.length == 0){
				$scope.m=0;
				document.getElementById("delete").classList.add("fa-disabled");
				document.getElementById("delete").className =document.getElementById("delete").className.replace(new RegExp('(?:^|\\s)'+ 'ic' + '(?:\\s|$)'), ' ');
				}
		});

		//$scope.regex = "/^-?[0-9][^\.]*$/";
		$scope.i = 0;
//<input type =  'text'  class='sizebar' id = 'addfe1' ng-model = 'savefe1' />
		$scope.addPaymentLine2 = function(){
			if($scope.l != 0){
				
				document.getElementById("billingregistry").removeAttribute("selectable");
				document.getElementById("billingregistry").removeAttribute("filterable");
			$("#save").show();
			$("#cancelAdd").show();
			$("#note").show();
			
			var newObj = {
					"duedate"  :  "<input type =  'date'  min='1990-01-01' placeholder = 'date'  class='sizebar1' style='width:143px'  id = 'addduedate1' ng-model = 'saveduedate1' />",
					"fe"       :  "<select id = 'addfe1' class = 'sizebar' style = 'width:120px' ng-model = 'savefe1' > <option value = 'Firm Date'>Firm Date</option> <option value = 'Estimated Date'>Estimated Date</option></select>",
					"amount"   :  "<input type =  'number'  class='sizebar1' id = 'addamount1' ng-model = 'addamt1'/>",
					"currency" :  "<select id = 'addcurrency1' class = 'sizebar' style = 'width:80px' ng-model = 'savecurrency1' > <option value = 'USD'>USD</option> <option value = 'CND'>CND</option></select>",
			      "description":"<textarea id = 'adddescription1' style = 'width: 148px' rows='1' cols='50' class='sizebar'></textarea>",
					   "status":"<select id = 'addstatus1' class = 'sizebar' ng-model = 'savestatus' > <option value = 'Opened'>Opened</option> <option value = 'Billed'>Billed</option><option value = 'Collected'>Collected</option></select>",
			        "issuedate":"<input type =  'date'  class='sizebar1' style = 'width:143px' id = 'addissuedate1' ng-model = 'saveissuedate1'/>",
		           "invoiceno" :	"<input type =  'text'  class='sizebar' id = 'addinvoiceno1' ng-model = 'saveinvoiceno1'/>",
			        "shoporder":"<input type =  'text'   class='sizebar' id = 'addshoporder1' ng-model = 'saveshoporder1'/>",
			        "payment":"<select id = 'addpayment1' class = 'sizebar' ng-model = 'savepayment' > <option value = 'Progress'>Progress</option> <option value = 'Receivable'>Receivable</option></select>",
			        "func":"<select id = 'addfunc1' class = 'sizebar' ng-model = 'savefunc' > <option value = 'MFG'>MFG</option> <option value = 'ENG'>ENG</option><option value = 'SPACE'>SPACE</option></select>",
			       "mile":"<input type =  'number' ng-pattern={{regex}} class='sizebar' id = 'addmile1' ng-model = 'savemile1'/>"
			}
		
			
			$scope.i=$scope.i+1;
			$scope.addamt1;
			
			if($scope.i==1){
			
			$scope.billingRegistrySingledata.push(newObj);
			
			document.getElementById("add").classList.add("fa-disabled");
			debugger;
			document.getElementById("add").className =document.getElementById("add").className.replace(new RegExp('(?:^|\\s)'+ 'ic' + '(?:\\s|$)'), ' ');
            /*$scope.amt=document.getElementById("addamount1").value;
			$scope.Total+=$scope.amt;
			alert($scope.Total);*/
			}
			
		}
			
			
		}

		
		$scope.cancel = function(){
			$scope.i=0;
			$scope.billingRegistrySingledata.pop();
			$("#save").hide();
			$("#cancelAdd").hide();
			document.getElementById("add").className =document.getElementById("add").className.replace(new RegExp('(?:^|\\s)'+ 'fa-disabled' + '(?:\\s|$)'), ' ');
			document.getElementById("add").classList.add("ic");
			document.getElementById("billingregistry").setAttribute("selectable","true");
			
		}
		$scope.cancelupdate = function(){
			$scope.k=0;
			$scope.l=0;
			$state.go($state.current, {}, {reload: true});
			$("#update").hide();
			$("#cancelup").hide();
			document.getElementById("add").className =document.getElementById("add").className.replace(new RegExp('(?:^|\\s)'+ 'fa-disabled' + '(?:\\s|$)'), ' ');
			document.getElementById("add").classList.add("ic");
			
		}

		$scope.addPaymentLine = function(){


            var duedate=document.getElementById("addduedate1").value;
			var fes = document.getElementById("addfe1").value;
			
			var amount = document.getElementById("addamount1").value;
			var currency = document.getElementById("addcurrency1").value;
			var invoiceno = document.getElementById("addinvoiceno1").value;
			var shoporder = document.getElementById("addshoporder1").value; 
			var status = document.getElementById("addstatus1").value;
			var issuedate=document.getElementById("addissuedate1").value;
			var description=document.getElementById("adddescription1").value;
			var payment = document.getElementById("addpayment1").value;
			var func = document.getElementById("addfunc1").value;
			var mile = document.getElementById("addmile1").value;
			var str = "";
			var chk_amt1= /^[0-9]*([.][0-9]*)?$/;
			var chk_mile=/^[0-9]\d*$/;
			var str1 = duedate == "" ? "Due date, " :"";
			var str2 = amount == "" ? " Amount, " : "";
			var str3 = issuedate == "" ? " Issue date" : "";
			
			if(duedate == "" || amount == "" || issuedate == ""){
				//var br = document.createElement("br");
			  
				var mmsg="Please enter the mandatory fields :: ";
				alert(chk_amt1.test(amount)+" in not fill");
				 $scope.errorMsg=mmsg+str1+str2+str3;
				 document.getElementById("addduedate1").className =document.getElementById("addduedate1").className.replace(new RegExp('(?:^|\\s)'+ 'sizebar' + '(?:\\s|$)'), 'sizebar1');
				 document.getElementById("addissuedate1").className =document.getElementById("addissuedate1").className.replace(new RegExp('(?:^|\\s)'+ 'sizebar' + '(?:\\s|$)'), 'sizebar1');
				 document.getElementById("addamount1").className =document.getElementById("addamount1").className.replace(new RegExp('(?:^|\\s)'+ 'sizebar' + '(?:\\s|$)'), 'sizebar1');
				 document.getElementById("errormsg").click();
				 /* var $errormsg =  $("#errormsg");
                    $errormsg.find('.fade-out, .hidden ').removeClass('fade-out hidden');
                    $errormsg.show();*/
			}
		
			
			else{
				if(issuedate<duedate){
					if(chk_amt1.test(amount)){
						alert(chk_amt1.test(amount));
                       // if(chk_mile.test(mile)){
					var baseUrl = $rootScope.baseServUrl + "/cots/addPaymentLine";
					var data = {"duedate":duedate,"description":description ,"fe":fes,"amount":amount,"currency":currency,"status":status,"issuedate":issuedate,"shoporder":shoporder,"invoiceno":invoiceno,"payment":payment,"func":func,"mile":mile,"reqno":localStorage.getItem("singleReqNo")};
					PredixViewService.addPaymentLineCall(baseUrl,data,function(data){
						document.getElementById("billingregistry").setAttribute("selectable","true");
						$scope.billingRegistrySingledata = [];
						//$socpe.
						//$state.go($state.current, {}, {reload: true});
						$scope.billingRegistrySingle();
						//$state.go($state.current, {}, {reload: true});
						$scope.successMsg = "Record added successfully";
						document.getElementById("successmsg").click();
	                     /*var $successmsg =  $("#successmsg");
	                     $successmsg.find('.fade-out, .hidden ').removeClass('fade-out hidden');
	                     $successmsg.show();*/
	                    
					});
	
					
					//$window.location.reload();
					$scope.i=0;
					$("#save").hide();
					$("#cancelAdd").hide();
					$("#errormsg").hide();
					$("#note").hide();
					document.getElementById("billingregistry").setAttribute("selectable","true");
					document.getElementById("add").className =document.getElementById("add").className.replace(new RegExp('(?:^|\\s)'+ 'fa-disabled' + '(?:\\s|$)'), ' ');
					document.getElementById("add").classList.add("ic");
					$scope.msg="Record Added Successfully";
			      /*}else{
	                	 $scope.errorMsg="Mile takes only integers";
						  document.getElementById("errormsg").click();
	                 }*/
			  }else{
				  $scope.errorMsg="Enter valid amount";
				  document.getElementById("errormsg").click();
				  
			  }
				}else{
				/*	$scope.errorMsg="Issue date should be less than Due date,Please Enter Valid Issue Date";
					  var $errormsg =  $("#errormsg");
	                     $errormsg.find('.fade-out, .hidden ').removeClass('fade-out hidden');
	                     $errormsg.show();*/
					$scope.errorMsg="Issue date should be less than Due date,Please Enter Valid Issue Date";
					 document.getElementById("errormsg").click();
				}
			}

		};

		$scope.editPaymentLine = function(){
			//debugger;



			var fes = document.getElementById("editfe").value;
			var amount = document.getElementById("editamount").value;

			var invoiceno = document.getElementById("editinvoiceno").value;
			var shoporder = document.getElementById("editshoporder").value; 
			var issuedate = document.getElementById("editissuedate").value;
			var duedate = document.getElementById("editduedate").value;
			var status = document.getElementById("editstatus").value;
			var mile = document.getElementById("editmile").value;
            var str = "";
			var chk_amt= /^[0-9]*([.][0-9]*)?$/;
			var chk_mile=/^[0-9]\d*$/;
            //var chk_amt=new RegExp('?<=^| )\d+(\.\d+)?(?=$| )|(?<=^| )\.\d+(?=$|');

            var str1 = duedate == "" ? "Due date " :"";
			var str2 = amount == "" ? "Amount " : "";
			var str3 = issuedate == "" ? "Issue date" : "";
			//var amt= chk_amt.test(amount) ? "Enter valid Amount" : "";
			
		/*	if(mile!=""){
			
			if(chk_mile.test(mile)){
				
			
			}
			else{
				$scope.errorMsg="Mile takes only integers";
				  document.getElementById("errormsg").click();
			}
			}*/
			

	if(duedate == "" || amount == "" || issuedate == ""){
				//var br = document.createElement("br");
			  
				var mmsg="Please enter the mandatory fields ::: ";
			
				 $scope.errorMsg=mmsg+str1+str2+str3;
				 document.getElementById("errormsg").click();
				  /*var $errormsg =  $("#errormsg");
                    $errormsg.find('.fade-out, .hidden ').removeClass('fade-out hidden');
                    $errormsg.show();*/
			}
			else{
				
					  if(issuedate<duedate){
			                 if(chk_amt.test(amount)){
			                	 
			            /*       if(mile!=""){
			                	
		                         if(chk_mile.test(mile)){
		                        	 break lab;
		                         }
		                         else{
		                        	 $scope.errorMsg="Mile takes only integers";
									  document.getElementById("errormsg").click();
		                         }
		                         }
			      	    else{*/
						
								var brid;
								var dataIndexes = [];
								$scope.rowData = document.getElementById("billingregistry").selectedRows;
								for(var i =0;i<$scope.rowData.length;i++ ){
									/*shoporder.push( $scope.rowData[i].row.shoporder.value);*/
									dataIndexes.push($scope.rowData[i].row.dataIndex);
								}
						
								
								 /*for(var i =0;i<dataIndexes.length;i++){*/
							    		
							    		brid = $scope.billingRegistrySingledata[dataIndexes[0]].brid;
							    		 /*}*/
									
							    	var baseUrl = $rootScope.baseServUrl + "/cots/editPaymentLine";
							    	var data = {};
								data.duedate =document.getElementById("editduedate").value;
								data.fe=document.getElementById("editfe").value;
								data.amount=document.getElementById("editamount").value;
								data.currency=document.getElementById("editcurrency").value;
								 data.description=document.getElementById("editdesc").value;
								data.status=document.getElementById("editstatus").value;
							    data.issuedate=document.getElementById("editissuedate").value;
							    data.shoporder=document.getElementById("editshoporder").value;
							    data.invoiceno=document.getElementById("editinvoiceno").value;
							    data.payment=document.getElementById("editpayment").value;
							    data.func=document.getElementById("editfunc").value;
							    data.mile=document.getElementById("editmile").value;
							    data.brid=brid;
							    console.log(data);
							    console.log(JSON.stringify(data));
							    PredixViewService.editPaymentLineCall(baseUrl,data,function(data){
							    	$scope.billingRegistrySingledata = [];
							    	$scope.billingRegistrySingle();
							    	
							    	//$state.go($state.current, {}, {reload: true});
							    	$scope.successMsg = "Record Updated successfully";
							    	document.getElementById("successmsg").click();
				                   /*  var $successmsg =  $("#successmsg");
				                     $successmsg.find('.fade-out, .hidden ').removeClass('fade-out hidden');
				                     $successmsg.show();*/
								});
								
								$scope.k=0;
								$scope.l=1;
								$scope.m=0;
								//$timeout(function() { $scope.displayErrorMsg = false;}, 2000);
								$("#update").hide();
								$("#cancelup").hide();
								$("#errormsg").hide();
								$("#note").hide();
								document.getElementById("add").className =document.getElementById("add").className.replace(new RegExp('(?:^|\\s)'+ 'fa-disabled' + '(?:\\s|$)'), ' ');
								document.getElementById("add").classList.add("ic");
								$scope.msg="Data Updated Successfully"
							    document.getElementById("edit").className =document.getElementById("edit").className.replace(new RegExp('(?:^|\\s)'+ 'ic' + '(?:\\s|$)'), ' ');
								document.getElementById("edit").classList.add("fa-disabled");
								document.getElementById("delete").className =document.getElementById("edit").className.replace(new RegExp('(?:^|\\s)'+ 'ic' + '(?:\\s|$)'), ' ');
								document.getElementById("delete").classList.add("fa-disabled");
			                   
								//$("#alert").show();
								//document.getElementById("hiddenbtn").click();
								//$timeout(function() {$state.go($state.current, {}, {reload: true});}, 1500);
								//$timeout(function() {}, 3000);
								
								// $state.go($state.current, {}, {reload: true});
							
								/*$window.location.reload();*/
			                /* }else{
			                	 $scope.errorMsg="Mile takes only integers";
								  document.getElementById("errormsg").click();
			                 }*/
					  }else{
						  $scope.errorMsg="Enter valid amount";
						  document.getElementById("errormsg").click();
						  
					  }
					  }else{
						  $scope.errorMsg="Issue date should be less than Due date,Please Enter Valid Issue Date";
						  document.getElementById("errormsg").click();
						  /*var $errormsg =  $("#errormsg");
			                $errormsg.find('.fade-out, .hidden ').removeClass('fade-out hidden');
			                $errormsg.show();*/
					  }
			}

				  
				
		
		};

		
		
		/*$scope.editPaymentLine2 = function(){
			var fes = document.getElementById("editfe").value;
			var amount = document.getElementById("editamount").value;

			var invoiceno = document.getElementById("editinvoiceno").value;
			var shoporder = document.getElementById("editshoporder").value; 
			var status = document.getElementById("editstatus").value;

			var newObj = {
					
					"duedate"  :  "<input type =  'date' placeholder = 'date'  class='sizebar' id = 'addduedate1' />",
					"fe"       :  "<select id = 'addfe1' class = 'sizebar' ng-model = 'savefe1' > <option value = 'F'>F</option> <option value = 'E'>E</option></select>",
					"amount"   :  "<input type =  'number'  class='sizebar' id = 'addamount1' value= 'amount'/>",
					"currency" :  "<input type =  'text'  class='sizebar' id = 'addcurrency1' ng-model = 'savecurrency1'/>",
			      "description":"<input type =  'text'  class='sizebar' id = 'adddescription1' ng-model = 'savedesc1'/>",
					   "status":"<select id = 'addstatus1' class = 'sizebar' ng-model = 'savestatus' > <option value = 'Opened'>Opened</option> <option value = 'Billed'>Billed</option><option value = 'Collected'>Collected</option></select>",
			        "issuedate":"<input type =  'date'  class='sizebar' id = 'addissuedate1' ng-model = 'saveissuedate1'/>",
		           "invoiceno" :	"<input type =  'number'  class='sizebar' id = 'addinvoiceno1' ng-model = 'saveinvoiceno1'/>",
			        "shoporder":"<input type =  'text'   class='sizebar' id = 'addshoporder1' ng-model = 'saveshoporder1'/>",
			        "payment":"<select id = 'addpayment1' class = 'sizebar' ng-model = 'savepayment' > <option value = 'Progress'>Progress</option> <option value = 'Receivable'>Receivable</option></select>",
			        	"func":"<select id = 'addfunc1' class = 'sizebar' ng-model = 'savefunc' > <option value = 'MFG'>MFG</option> <option value = 'ENG'>ENG</option><option value = 'SPACE'>SPACE</option></select>"
			}
			
			
			}*/

		$scope.deletePaymentLine = function(){
			
			console.log("inside the delete");
		
			if($scope.k <= 0 && $scope.m > 0){
		
			var baseUrl = $rootScope.baseServUrl + "/cots/deletePaymentLine";
			
			var brids = [];
			var dataIndexes = [];
			$scope.rowData = document.getElementById("billingregistry").selectedRows;
			for(var i =0;i<$scope.rowData.length;i++ ){
				/*shoporder.push( $scope.rowData[i].row.shoporder.value);*/
				dataIndexes.push($scope.rowData[i].row.dataIndex);
			}
			
			 for(var i =0;i<dataIndexes.length;i++){
		    		brids.push($scope.billingRegistrySingledata[dataIndexes[i]].brid);
		     }
			var data = JSON.stringify(brids);
			/*var inputData = {};
			inputData.input = brids[0];
			console.log("Before the method call :: input value:"+brids[0]);*/
			PredixViewService.deletePaymentLineCall(baseUrl, data, function(data){
				//$scope.billingRegistrySingledata = [];
				
				$scope.billingRegistrySingle();
				$scope.successMsg = "Record deleted successfully";
				document.getElementById("successmsg").click();
	            /*var $successmsg =  $("#successmsg");
	            $successmsg.find('.fade-out, .hidden ').removeClass('fade-out hidden');
	            $successmsg.show();*/
				//$state.go($state.current, {}, {reload: true});
				
			});
			$scope.billingRegistrySingle();
			$scope.successMsg = "Record deleted successfully";
			document.getElementById("successmsg").click();
           /* var $successmsg =  $("#successmsg");
            $successmsg.find('.fade-out, .hidden ').removeClass('fade-out hidden');
            $successmsg.show();*/
            $scope.l = 1;
			/*$window.location.reload();*/
			//$scope.msg="Deleted Successfully";
			//document.getElementById("hiddenbtn").click();
			$timeout(function() {$state.go($state.current, {}, {reload: true});}, 1500);
			//$scope.billingRegistrySingle();
			
			}
			
			
			
		
		
		};
		$scope.cancel = function(){

			$state.reload();

		};

//		Download Excel Report
		$scope.exportExcel = function(){
			
			if($scope.billingRegistrySingledata.length==0){
				 $scope.errorMsg="Billing Register Is Empty.Cannot export Empty Register";
				 document.getElementById("errormsg").click();
				/* var $errormsgr =  $("#errormsgr");
	                $errormsgr.find('.fade-out, .hidden ').removeClass('fade-out hidden');
	                $errormsgr.show();*/
				
			}
			else{
			$scope.reportTittle="Billing Register";


			PredixViewService.JSONToCSVConvertor($scope.billingRegistrySingledata, $scope.reportTittle, true);
			}
		};


		$scope.exportPdf =function(){
			if($scope.billingRegistrySingledata.length==0){
				 $scope.errorMsg="Billing Register Is Empty.Cannot export Empty Register";
				 document.getElementById("errormsg").click();
				/* var $errormsgr =  $("#errormsgr");
	                $errormsgr.find('.fade-out, .hidden ').removeClass('fade-out hidden');
	                $errormsgr.show();*/
				
			}
			
			else{
			
			if( jQuery.isEmptyObject($scope.billingRegistrySingledata)){
				var $oneRow =  $("#oneRow");
				$oneRow.find('.fade-out, .hidden ').removeClass('fade-out hidden');
				$oneRow.show();
				return;
			}
			var columns = ["DueDate", "F/E", "Amnt","Currency","Description","Status","Iss Date","Inv No","Shop Order","Payment","Func"];
			var rows = [];
			angular.forEach($scope.billingRegistrySingledata, function(value, key) {
				var rowArr = [];
				rowArr.push(value.duedate);
				rowArr.push(value.fe);
				rowArr.push(value.amount);
				rowArr.push(value.currency);
				rowArr.push(value.description);
				rowArr.push(value.status);
				rowArr.push(value.issuedate);
				rowArr.push(value.invoiceno);
				rowArr.push(value.shoporder);
				rowArr.push(value.payment);
				rowArr.push(value.func);
				rows.push(rowArr);
			});

			var doc = new jsPDF('p', 'pt');
			doc.setFontSize(10);
			doc.text(20,15,"Customer Name: "+$scope.custName);
			doc.text(350,15,"Product Note: "+$scope.productNote);
			doc.text(20,30,"Toatal Amount: "+$scope.totalamnt);
			doc.text(350,30,"Requisition No: "+$scope.singleReqNo);
			doc.autoTable(columns, rows,{
				margin: {left: 5},


				headerStyles: {
					fillColor: [250, 152, 95],
//					textColor: [78, 53, 73], //Black    
					textColor: [255, 255, 255], //White    
				},
				bodyStyles: {
//					fillColor: [250, 152, 95],            
					textColor: [30, 30, 30]
				},
				styles: {
					overflow: 'linebreak',
					columnHeight: 'wrap'
				},
				columnStyles: {
					0: {columnWidth: 60},
					1: {columnWidth: 40},
					2: {columnWidth: 40},
					3: {columnWidth: 40},
					4: {columnWidth: 90},
					5: {columnWidth: 50},
					6: {columnWidth: 60},
					7: {columnWidth: 50},
					8: {columnWidth: 50},
					9: {columnWidth: 60},
					10: {columnWidth: 40},
				}
			});
			doc.save('Report Table.pdf');
			}

		}
		
		
		
	/*	document.getElementById("billingregistry").addEventListener('change',function(e){
			
			alert("Changed");
			console.log(e.detail);
			console.log(JSON.stringify(e.detail));
		});
*/





	}]);


});
