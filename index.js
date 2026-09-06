			angular.module('app', [])
			  .controller('ctrMan',
			    function($scope) {
			      var modCtg = document.getElementById('modCtg');
			      var modSrt = document.getElementById('modSrt');
			      var modCrt = document.getElementById('modCrt');
			      var bdgCrt = document.getElementById("bdgCrt");
			      window.onclick = function(event) {
			        if (event.target == modCtg) {
			          modCtg.style.display = "none";
			        }else if(event.target == modSrt){
			          modSrt.style.display = "none";
			        }
			        else if(event.target == modCrt){
			          modCrt.style.display = "none";
			        }
			      }
			      $scope.currentPage = 0;
			      $scope.pagSiz = 0;
			      $scope.pageSize = 6;
			      $scope.pages = [];
			      $scope.itms = [];
			      $scope.itmsCur = [];
			      $scope.ctgs = [];
			      $scope.itmsCrt = [];
			      $scope.txtSrt = '...';
			      $scope.txtCtg = '...';
			      $scope.txtAlf = '...';
			      $scope.txtMay = '...';
			      $scope.txtMen = '...';
			      $scope.txtNxt = '...';
			      $scope.txtPrv = '...';
			      $scope.txtSrtCrt = $scope.txtAlf;
			      $scope.sort = 'd';
			      $scope.ctg = '';
			      $scope.txtTel='';
			      $scope.txtCor='';
			      $scope.txtInf='';
			      $scope.txtSct='';
			      $scope.txtPlaNam='';
			      $scope.txtSct='';
			      $scope.txtSin='';
			      $scope.uni = false;
			      $scope.cla = false;
			      $scope.wat = false;
			      $scope.crt = false;
			      $scope.lod = true;
			      $scope.btc = false;
			      $scope.img = true;
			      $scope.ctok='';
			      $scope.ernw='';
			      $scope.clt = 'w3-black';
			      $scope.cblu = '#1A73E8';
			      $scope.cgre = '#33AA66';
			      $scope.clo = 'close';

				  $scope.configPages = function() {
				  		var q = $scope.srch;
				  		try{
				  			q = $scope.srch.replace(" ","");
				  		}catch(e){

				  		}
				        if($scope.ctg=='' && q=='' ){
				            $scope.itmsCur = $scope.itms;
				        }else{

				        	if(q != ''){
				        		$scope.txtCtgCrt = $scope.ctgs[0].n;
				        		$scope.ctg = 0;
				        		$scope.currentPage = 0;
				        	}
				            $scope.itmsCur = [];
				            try{
				            	$scope.itms.forEach( function(val, ind, arr) {

					                var ax = q==""?true:(val.d.toUpperCase().search(q.toUpperCase() ) > -1  );

					                if( ($scope.ctg=='' || val.c==$scope.ctg) && ax ){
					                    $scope.itmsCur.push(val);
					                }
					            });
				            }catch(e){

				            }
				        }
				        var intRef = 20;
				        $scope.pages.length = 0;
				        var ini = $scope.currentPage - 4;
				        var fin = $scope.currentPage + 5;
				        if (ini < 1) {
				          ini = 1;
				          fin = Math.ceil($scope.itmsCur.length / $scope.pageSize);
				        } else {
				            ini = -1;
				            fin = Math.ceil($scope.itmsCur.length / $scope.pageSize);
				        }
				        if (ini < 1) ini = 1;
				        for (var i = ini; i <= fin; i++) {
				          $scope.pages.push({
				            no: i
				          });
				        }
				        if ($scope.currentPage >= $scope.pages.length)
				          $scope.currentPage = $scope.pages.length;
				      };



			      $scope.setPage = function(index) {
			        $scope.currentPage = index - 1;
			      };

			      $scope.nxt = function() {
			        $scope.currentPage = $scope.currentPage + 1;
			        topScr();
			      };
			      $scope.ntr = function() {
			      	$scope.currentPage = $scope.currentPage - 1;
			        topScr();
			      };


			      $scope.addCrt = function(e,itm){
			        e.setAttribute('class','fa fa-check-circle w3-xxlarge pointer');
			        e.style.color = $scope.cgre;
				    addItmCrt(itm);
				    setTimeout(function () {
				      e.setAttribute('class','fa fa-cart-plus w3-xxlarge pointer');
				      e.style.color = $scope.cblu;
				    }, 600);


			      }

			      $scope.myCrt = function(){
			        modCrt.style.display='block';
			        $scope.itmsCrt = getStg();
			      }
			      $scope.delItmCrt = function(itm){
			        $scope.itmsCrt = delItmCrt(itm);
			      }
			      $scope.selSrt = function(sel){
			        switch(sel) {
			          case 0:
			            $scope.txtSrtCrt = $scope.txtAlf;
			            $scope.sort = 'd';
			            break;
			          case 1:
			            $scope.txtSrtCrt = $scope.txtMyp;
			            $scope.sort = '-v';
			            break;
			          case 2:
			            $scope.txtSrtCrt = $scope.txtMnp;
			            $scope.sort = 'v';
			            break;
			        }
			        modSrt.style.display = "none";
			      }
			      $scope.selCtg = function(ctg){

			        $scope.txtCtgCrt = ctg.n;
			        $scope.ctg = ctg.i==0?'':ctg.i;
			        modCtg.style.display = "none";
			        $scope.currentPage = 0;
			        $scope.srch = '';
			        $scope.configPages();
			      }
			      $scope.srchAll = function(){
			        console.log("mycart: "+$scope.srch);

			      }
			      $scope.snd = function(){

			        var text = $scope.txtPlaNam+": "+$scope.namc+"\n\n";
			        var suc = true;

			        $scope.itmsCrt.itms.forEach( function(v, i, ar) {

			        	if( !(!isNaN(v.q) && !isNaN(parseFloat(v.q) ) ) ){
			        		suc = false;
			        		return;
			        	}

			            text += "*"+v.q+" -> "+v.d+" :"+v.k+"\n";
			        });

			        if(suc){
			        	setStg({});
			            $scope.itmsCrt = [];
			            bdgCrt.style.visibility = "hidden";
			            modCrt.style.display = "none";

				        window.open(
				          encodeURI('https://api.whatsapp.com/send?phone='+$scope.txtTel+'&text='+text),
				          '_blank'
				        );
			        }else{
			        	alert("only numeric values");
			        }


			      }
			      addItmCrt(null);
			      var unts = {};
			      var result = data;


			        var ctnMan = document.getElementById("ctnMan");
			        ctnMan.style.visibility = "visible";
			        var loader = document.getElementById("loader");
			        loader.style.visibility = "hidden";
			        var lg_v = document.getElementById("lg");
			        var ngc = result.ngc;


			        $scope.txtSrt = result.orp;
			        $scope.txtCtg = result.ctgs;
			        $scope.txtAlf = result.alf;
			        $scope.txtMyp = result.myp;
			        $scope.txtMnp = result.mnp;
			        $scope.txtBsc = result.bsc;
			        $scope.txtNxt = result.nxt;
			      	$scope.txtPrv = result.prv;
			        $scope.ctok = result.ctok;
			        $scope.ernw = result.ernw;

			        $scope.txtTel = result.tel2;
			        $scope.txtCor = result.cor2;
			        $scope.txtInf = result.dir2;

			        $scope.img = result.img;

			        $scope.uni = !result.uni;
			        $scope.cla = !result.cla;
			        $scope.clo = result.clo;


			        $scope.wat = result.wha&&result.tel2!='';
			        $scope.crt = result.crt&&result.tel2!='';
			        $scope.txtSct = result.sct;
			        $scope.txtPlaNam = result.nam;

			        $scope.txtSin = result.sin;

			        $scope.txtSct = result.sct;
			        $scope.txtSrtCrt = $scope.txtAlf;

			        $scope.clt = result.clt;
			        $scope.ngc = ngc;


			        if(result.lg.length>0){
			          $scope.lg = result.lg;
			        }else{
			          lg_v.style.visibility = "hidden";
			          $scope.lg = "0=="
			        }

			        result.und.forEach( function(val, ind, arr) {
			            unts[val.i] = val.n;
			        });


			        $scope.itms = result.itm;
			        $scope.ctgs = result.ctg;
			        $scope.txtCtgCrt = $scope.ctgs[0].n;


			        $scope.itms.forEach( function(val, ind, arr) {
			            val.u = unts[val.u];

			        });



			        var link = document.createElement('link');
			        link.rel = 'icon';
			        document.getElementsByTagName('head')[0].appendChild(link);
			        link.href = 'logo.png';
			        $scope.currentPage = 1;
			        $scope.configPages();
			        topScr();
					setTimeout(function () {
				      	var el = document.getElementById('labNeg');
					   	var divHeight = el.offsetHeight
					   	var lineHeight = parseInt(el.style.lineHeight);
					   	var lines = divHeight / lineHeight;
	    				if( lines < 2){
	    					el.style.lineHeight = "50px";
	    				}
	    				if($scope.ngc.length>25){
							el.style.fontSize = "16px";
	    				}
	    				if($scope.ngc.length>40){
							el.style.fontSize = "14px";
	    				}
	    				el.style.visibility = "visible";
				    }, 400);
			    })
			.filter('startFromGrid', function() {
			  return function(input, start) {
			    start = +start;
			    return input.slice(start);
			  }
			});
			var stgLoc={};
            function stgChk(){
                var test = 'test';
                try {
                    localStorage.setItem(test, test);
                    localStorage.removeItem(test);
                    return true;
                } catch(e) {
                    return false;
                }
            }
            function getStg(){
                if( stgChk() ){
                  var itmsAux = localStorage.getItem("mn_shop_13x");
                  return itmsAux==null?{}:JSON.parse(itmsAux);
                }else{
                  return stgLoc;
                }
            }
            function setStg(itms){
                if( stgChk() ){
                  localStorage.setItem("mn_shop_13x", JSON.stringify(itms) );
                }else{
                  stgLoc = itms;
                }
            }
			function addItmCrt(itm){
			    var itmsCrt = getStg();
			    if(itmsCrt.itms==undefined){
			        itmsCrt.itms = [];
			        if(itm!=null){
			          itm.q = 1;
			          itmsCrt.itms.push(itm);
			        }
			      }else if(itm!=null){
			          var aux = null;
			          for(var i=0;i<itmsCrt.itms.length;i++){
			            if(itmsCrt.itms[i].i==itm.i){
			                aux=itmsCrt.itms[i];
			                break;
			              }
			          }
			          if(aux==null){
			            itm.q = 1;
			            itmsCrt.itms.push(itm);
			          }else{
			            aux.q +=1;
			          }

			      }
			    setStg(itmsCrt);
			    bdgCrt.innerHTML = itmsCrt.itms.length;
			    bdgCrt.style.visibility = itmsCrt.itms.length==0? "hidden":"visible";

			}
			function delItmCrt(itm){
			    var itmsCrt = getStg();
			    var ind = -1;
			    for(var i=0;i<itmsCrt.itms.length;i++){
			      if(itmsCrt.itms[i].i==itm.i){
			          ind=i;
			          break;
			        }
			    }
			    if(ind>-1){
			      itmsCrt.itms.splice(ind, 1);
			    }
			    setStg(itmsCrt);
			    bdgCrt.innerHTML = itmsCrt.itms.length;
			    bdgCrt.style.visibility = itmsCrt.itms.length==0? "hidden":"visible";
			    return itmsCrt;
			}
			function topScr() {
			  document.body.scrollTop = 0;
			  document.documentElement.scrollTop = 0;
			}
			function ajIm(el){
				el.style.marginTop = ((260-el.offsetHeight)/2)+"px";
			}
			var data = /*#d4t4#*/ {"itm":[{"c":1,"d":"PIEZA ARITOS","i":"3874488","k":"3874488","l":"3874488","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA ARO MANZANA","i":"949488","k":"949488","l":"null","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA BOMBOM JUMBO","i":"4858812","k":"4858812","l":"4858812","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA CACAHUATE CON AJO Y TOTOPO","i":"7501954910450","k":"7501954910450","l":"7501954910450","p":"$11","u":10,"v":11,"z":200},{"c":1,"d":"PIEZA CACAHUATE ENCHILADO","i":"7342161000813","k":"7342161000813","l":"7342161000813","p":"$11","u":10,"v":11,"z":200},{"c":1,"d":"PIEZA CACAHUATE ESPAÑOL","i":"98877662272782","k":"98877662272782","l":"98877662272782","p":"$11","u":10,"v":11,"z":200},{"c":1,"d":"PIEZA CACAHUATE GARAPIÑADO","i":"832651100","k":"832651100","l":"832651100","p":"$11","u":10,"v":11,"z":200},{"c":1,"d":"PIEZA CACAHUATE JAPONES N.","i":"7501954910443","k":"7501954910443","l":"null","p":"$11","u":10,"v":11,"z":200},{"c":1,"d":"PIEZA CACAHUATE MEXICANA","i":"93838383","k":"93838383","l":"93838383","p":"$13","u":10,"v":13,"z":200},{"c":1,"d":"PIEZA CACAHUATE MIX JAPONES","i":"6544456899","k":"6544456899","l":"6544456899","p":"$11","u":10,"v":11,"z":200},{"c":1,"d":"PIEZA CACAHUATE SALADO","i":"000089","k":"000089","l":"null","p":"$11","u":10,"v":11,"z":200},{"c":1,"d":"PIEZA CACAHUATE SURTIDO","i":"88766661111","k":"88766661111","l":"88766661111","p":"$11","u":10,"v":11,"z":200},{"c":1,"d":"PIEZA CAMARON","i":"8765554411","k":"8765554411","l":"8765554411","p":"$11.5","u":10,"v":11.5,"z":200},{"c":1,"d":"PIEZA CHETOS","i":"734216100081","k":"734216100081","l":"734216100081","p":"$9.5","u":10,"v":9.5,"z":200},{"c":1,"d":"PIEZA CHICHARRON DE PUERCO","i":"7501954910238","k":"7501954910238","l":"null","p":"$21","u":10,"v":21,"z":200},{"c":1,"d":"PIEZA CHOCORETA MENTAS CHOCOLATE","i":"8484729","k":"8484729","l":"8484729","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA CHURRO ADOBADO","i":"7543390012","k":"7543390012","l":"7543390012","p":"$9.5","u":10,"v":9.5,"z":200},{"c":1,"d":"PIEZA CHURRO NATURAL","i":"94848","k":"94848","l":"94848","p":"$9.5","u":10,"v":9.5,"z":200},{"c":1,"d":"PIEZA DULCES DE GOMITA","i":"7501954907931","k":"7501954907931","l":"7501954907931","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA FRITURA CON CHILE","i":"0958483","k":"0958483","l":"null","p":"$9.5","u":10,"v":9.5,"z":200},{"c":1,"d":"PIEZA FRITURA NATURAL","i":"342161000813","k":"342161000813","l":"342161000813","p":"$9.5","u":10,"v":9.5,"z":200},{"c":1,"d":"PIEZA FRITURA PIKIN","i":"863217890","k":"863217890","l":"863217890","p":"$9.5","u":10,"v":9.5,"z":200},{"c":1,"d":"PIEZA FRITURA QUESO","i":"73421610008","k":"73421610008","l":"73421610008","p":"$9.5","u":10,"v":9.5,"z":200},{"c":1,"d":"PIEZA FRUTIGOMA","i":"37457819","k":"37457819","l":"null","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA GUSANO NEON","i":"847474","k":"847474","l":"847474","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA HABA","i":"0121","k":"0121","l":"0121","p":"$11","u":10,"v":11,"z":200},{"c":1,"d":"PIEZA JAPONES 40 GRAMS","i":"4848","k":"4848","l":"null","p":"$3","u":10,"v":3,"z":200},{"c":1,"d":"PIEZA JAPONES CHICO","i":"1234","k":"1234","l":"null","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA JAPONES GRANDE","i":"123","k":"123","l":"null","p":"$13.5","u":10,"v":13.5,"z":200},{"c":1,"d":"PIEZA LUNETAS CHOCOLATE","i":"84847381","k":"84847381","l":"84847381","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA MANGUITO","i":"8484819393","k":"8484819393","l":"null","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA MINICHICLE","i":"8585775","k":"8585775","l":"8585775","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA NUEZ","i":"9875415262","k":"9875415262","l":"9875415262","p":"$11.5","u":10,"v":11.5,"z":200},{"c":1,"d":"PIEZA OSITOS","i":"94737136","k":"94737136","l":"94737136","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA PALANQUETA LA ESPERANZA","i":"384849","k":"384849","l":"null","p":"$6.5","u":10,"v":6.5,"z":200},{"c":1,"d":"PIEZA PALOMITA NATURAL","i":"7342161000905","k":"7342161000905","l":"7342161000905","p":"$9.5","u":10,"v":9.5,"z":200},{"c":1,"d":"PIEZA PALOMITA QUESO","i":"99775433","k":"99775433","l":"99775433","p":"$9.5","u":10,"v":9.5,"z":200},{"c":1,"d":"PIEZA PAPA ADOBADA","i":"17373","k":"17373","l":"17373","p":"$13.25","u":10,"v":13.25,"z":200},{"c":1,"d":"PIEZA PAPA AZUL","i":"93338383838","k":"93338383838","l":"93338383838","p":"$13.25","u":10,"v":13.25,"z":200},{"c":1,"d":"PIEZA PAPA CASERA","i":"130209090301","k":"130209090301","l":"130209090301","p":"$13.25","u":10,"v":13.25,"z":200},{"c":1,"d":"PIEZA PAPA QUESO","i":"8383","k":"8383","l":"8383","p":"$13.25","u":10,"v":13.25,"z":200},{"c":1,"d":"PIEZA PEPITA FRITA","i":"84848","k":"84848","l":"null","p":"$11","u":10,"v":11,"z":200},{"c":1,"d":"PIEZA PINGUINO","i":"000085","k":"000085","l":"null","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA PISTACHE","i":"9822722","k":"9822722","l":"9822722","p":"$11.5","u":10,"v":11.5,"z":200},{"c":1,"d":"PIEZA PLATANO C\/ SAL","i":"95949","k":"95949","l":"null","p":"$19.75","u":10,"v":19.75,"z":200},{"c":1,"d":"PIEZA PLATANO CON SAL","i":"73737380101","k":"73737380101","l":"null","p":"$13","u":10,"v":13,"z":200},{"c":1,"d":"PIEZA PLATANO DULCE","i":"7503004600489","k":"7503004600489","l":"7503004600489","p":"$9.5","u":10,"v":9.5,"z":200},{"c":1,"d":"PIEZA REBANADA","i":"9494001919","k":"9494001919","l":"null","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA SEMILLA CRIOLLA","i":"75421178","k":"75421178","l":"75421178","p":"$11","u":10,"v":11,"z":200},{"c":1,"d":"PIEZA SEMILLA DE GIRASOL","i":"18484849","k":"18484849","l":"null","p":"$11","u":10,"v":11,"z":200},{"c":1,"d":"PIEZA TIBURON","i":"75747473","k":"75747473","l":"75747473","p":"$4.75","u":10,"v":4.75,"z":200},{"c":1,"d":"PIEZA TORSIDITO DE QUESO","i":"0086","k":"0086","l":"null","p":"$9.5","u":10,"v":9.5,"z":200},{"c":1,"d":"PIEZA VIVORITAS","i":"9876482","k":"9876482","l":"9876482","p":"$4.75","u":10,"v":4.75,"z":200},{"c":2,"d":"KILOGRAMO ACIDITOS","i":"000032","k":"000032","l":"null","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO ARANDANO","i":"000033","k":"000033","l":"null","p":"$150","u":10,"v":150,"z":200},{"c":2,"d":"KILOGRAMO ARO DURAZNO","i":"000034","k":"000034","l":"000034","p":"$92","u":10,"v":92,"z":200},{"c":2,"d":"KILOGRAMO ARO MANZANA","i":"000035","k":"000035","l":"null","p":"$92","u":10,"v":92,"z":200},{"c":2,"d":"KILOGRAMO BOQUITAS","i":"000036","k":"000036","l":"null","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE AJO Y PEPITA FRITA","i":"000054","k":"000054","l":"null","p":"$65","u":10,"v":65,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE AJO Y TOTOPO","i":"000053","k":"000053","l":"000053","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE ENCHILADO","i":"000055","k":"000055","l":"000055","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE ESPAÑOL","i":"000056","k":"000056","l":"null","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE GARAPIÑADO","i":"000057","k":"000057","l":"000057","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE JAPONES CHILIOS","i":"000058","k":"000058","l":"000058","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE JAPONES HABANERO","i":"000059","k":"000059","l":"000059","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE JAPONES MIX","i":"000060","k":"000060","l":"000060","p":"$65","u":10,"v":65,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE JAPONES NATURAL","i":"000061","k":"000061","l":"000061","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE JAPONES QUESO","i":"000062","k":"000062","l":"null","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE MEXICANA","i":"000063","k":"000063","l":"000063","p":"$65","u":10,"v":65,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE SALADO","i":"000064","k":"000064","l":"null","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE SIN SAL","i":"000065","k":"000065","l":"null","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO CACAHUATE SURTIDO","i":"000066","k":"000066","l":"null","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO CHOCORETAS","i":"000037","k":"000037","l":"000037","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO CHURRO NATURAL 1KG","i":"000081","k":"000081","l":"null","p":"$70","u":10,"v":70,"z":200},{"c":2,"d":"KILOGRAMO GARAPIÑADO ROJO","i":"000067","k":"000067","l":"null","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO GARBANZO","i":"000038","k":"000038","l":"null","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"KILOGRAMO GOMIFRUTA","i":"000039","k":"000039","l":"000039","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO GUSANO LISO","i":"000040","k":"000040","l":"000040","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO GUSANO NEON","i":"000041","k":"000041","l":"000041","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO HABA","i":"000068","k":"000068","l":"000068","p":"$73","u":10,"v":73,"z":200},{"c":2,"d":"KILOGRAMO HUEVITO ALMENDRA","i":"000042","k":"000042","l":"null","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO HUEVITOS","i":"7501025955083","k":"7501025955083","l":"7501025955083","p":"$107","u":10,"v":107,"z":200},{"c":2,"d":"KILOGRAMO KG.TIBURON","i":"000052","k":"000052","l":"null","p":"$92","u":10,"v":92,"z":200},{"c":2,"d":"KILOGRAMO LINEA DORADA","i":"000043","k":"000043","l":"000043","p":"$200","u":10,"v":200,"z":200},{"c":2,"d":"KILOGRAMO LUNETA","i":"000044","k":"000044","l":"000044","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO MANGUITO","i":"000045","k":"000045","l":"000045","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO MINICHICLE","i":"000046","k":"000046","l":"000046","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO MUELITAS","i":"000047","k":"000047","l":"null","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO NUEZ","i":"000072","k":"000072","l":"000072","p":"$300","u":10,"v":300,"z":200},{"c":2,"d":"KILOGRAMO NUEZ DE LA INDIA","i":"000071","k":"000071","l":"000071","p":"$300","u":10,"v":300,"z":200},{"c":2,"d":"KILOGRAMO OSITOS","i":"000048","k":"000048","l":"000048","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO OSO TAJIN","i":"000086","k":"000086","l":"null","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO PEPITA FRITA","i":"000069","k":"000069","l":"null","p":"$190","u":10,"v":190,"z":200},{"c":2,"d":"KILOGRAMO PINGÜINO","i":"000050","k":"000050","l":"null","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO PISTACHE","i":"000073","k":"000073","l":"000073","p":"$300","u":10,"v":300,"z":200},{"c":2,"d":"KILOGRAMO REBANDA","i":"000051","k":"000051","l":"null","p":"$88","u":10,"v":88,"z":200},{"c":2,"d":"KILOGRAMO SEMILLA CRIOLLA","i":"000070","k":"000070","l":"null","p":"$148","u":10,"v":148,"z":200},{"c":2,"d":"PIEZA 500GR.CHURRO CHILE SECO","i":"000082","k":"000082","l":"null","p":"$35","u":10,"v":35,"z":200},{"c":2,"d":"PIEZA 500KG FRITURA REGILLA CON CHILE","i":"000020","k":"000020","l":"null","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG. CHETO JALAPEÑO","i":"000009","k":"000009","l":"null","p":"$35","u":10,"v":35,"z":200},{"c":2,"d":"PIEZA 500KG. CHURRO CHIPOTLE","i":"000083","k":"000083","l":"null","p":"$35","u":10,"v":35,"z":200},{"c":2,"d":"PIEZA 500KG. FRITURA MINIRUEDA NATURAL","i":"000021","k":"000021","l":"000021","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG. FRITURA PALILLO C\/CHILE","i":"000012","k":"000012","l":"000012","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG. FRITURA PARRILLA C\/CHILE","i":"000013","k":"000013","l":"null","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG. FRITURA SURTIDA C\/CHILE","i":"000014","k":"000014","l":"null","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.CHETO NARANJA","i":"000007","k":"000007","l":"000007","p":"$35","u":10,"v":35,"z":200},{"c":2,"d":"PIEZA 500KG.CHETO ROJO","i":"000008","k":"000008","l":"000008","p":"$35","u":10,"v":35,"z":200},{"c":2,"d":"PIEZA 500KG.CHURRO NATURAL","i":"000084","k":"000084","l":"000084","p":"$35","u":10,"v":35,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA ANILLO C\/CHILE","i":"000015","k":"000015","l":"000015","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA ANILLO NATURAL","i":"000022","k":"000022","l":"000022","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA DONA C\/CHILE","i":"000016","k":"000016","l":"000016","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA DONA NATURAL","i":"000023","k":"000023","l":"000023","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA LAGRIMA C\/CHILE","i":"000017","k":"000017","l":"000017","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA LAGRIMITA NATURAL","i":"000024","k":"000024","l":"000024","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA MINICUADRO C\/CHILE","i":"000018","k":"000018","l":"000018","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA MINICUADRO NATURAL","i":"000025","k":"000025","l":"000025","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA MINIRUEDA C\/CHILE","i":"000019","k":"000019","l":"null","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA PALILLO NATURAL","i":"000026","k":"000026","l":"null","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA PARRILLA NATURAL","i":"000027","k":"000027","l":"null","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA SURTIDA NATURAL","i":"000028","k":"000028","l":"null","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.FRITURA TORNILLO C\/CHILE","i":"000011","k":"000011","l":"null","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA 500KG.PALOMA NATURAL","i":"000030","k":"000030","l":"000030","p":"$30","u":10,"v":30,"z":200},{"c":2,"d":"PIEZA 500KG.PALOMA QUESO","i":"000031","k":"000031","l":"000031","p":"$30","u":10,"v":30,"z":200},{"c":2,"d":"PIEZA 500KG.PAPA ADOBADA","i":"000076","k":"000076","l":"000076","p":"$75","u":10,"v":75,"z":200},{"c":2,"d":"PIEZA 500KG.PAPA AZUL","i":"000077","k":"000077","l":"000077","p":"$75","u":10,"v":75,"z":200},{"c":2,"d":"PIEZA 500KG.PAPA JALAPEÑA","i":"000078","k":"000078","l":"null","p":"$75","u":10,"v":75,"z":200},{"c":2,"d":"PIEZA 500KG.PAPA NATURAL","i":"000079","k":"000079","l":"000079","p":"$75","u":10,"v":75,"z":200},{"c":2,"d":"PIEZA 500KG.PAPA QUESO","i":"000080","k":"000080","l":"000080","p":"$75","u":10,"v":75,"z":200},{"c":2,"d":"PIEZA CACAHUATE JAPONES 160 GRAMS C\/10 PIEZAS","i":"7503003870425","k":"7503003870425","l":"null","p":"$115","u":10,"v":115,"z":200},{"c":2,"d":"PIEZA CACAHUATE JAPONES 20 GRMS C\/ 50 PIEZAS","i":"7503003870029","k":"7503003870029","l":"null","p":"$75","u":10,"v":75,"z":200},{"c":2,"d":"PIEZA CACAHUATE JAPONES 40 GRAMS C\/25 BULTO C\/24","i":"7503003870869","k":"7503003870869","l":"null","p":"$79","u":10,"v":79,"z":200},{"c":2,"d":"PIEZA CACAHUATE JAPONES 40 GRAMS C\/50","i":"7503003870555","k":"7503003870555","l":"null","p":"$151.5","u":10,"v":151.5,"z":200},{"c":2,"d":"PIEZA CACAHUATE JAPONES 50 GRAMS C\/25 PIEZAS BULTO C\/20","i":"7503017028034","k":"7503017028034","l":"null","p":"$85.5","u":10,"v":85.5,"z":200},{"c":2,"d":"PIEZA CACAHUATE JAPONES 50 GRAMS C\/50 PIEZAS BULTO C\/10","i":"7503003870142","k":"7503003870142","l":"null","p":"$169.5","u":10,"v":169.5,"z":200},{"c":2,"d":"PIEZA CACAHUATE JAPONES 60 GRAMS C\/25","i":"7503003870548","k":"7503003870548","l":"null","p":"$98","u":10,"v":98,"z":200},{"c":2,"d":"PIEZA CACAHUATE JAPONES 60 GRAMS C\/50 PIEZAS","i":"7503003870173","k":"7503003870173","l":"null","p":"$196","u":10,"v":196,"z":200},{"c":2,"d":"PIEZA CHICHARRON 10×10","i":"000001","k":"000001","l":"000001","p":"$38","u":10,"v":38,"z":200},{"c":2,"d":"PIEZA FRITURA C\/20 PIEZAS SURTIDO","i":"000002","k":"000002","l":"000002","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"PIEZA FRITURA CON 20 PIEZAS SABOR CHILE","i":"000003","k":"000003","l":"null","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"PIEZA FRITURA TORNILLO 500 GR NATURAL","i":"000029","k":"000029","l":"null","p":"$28","u":10,"v":28,"z":200},{"c":2,"d":"PIEZA FRITURAS CON 20 PIEZAS SABOR NATURAL","i":"000004","k":"000004","l":"null","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"PIEZA GARRA AZUL 500 GRMS.","i":"000010","k":"000010","l":"000010","p":"$35","u":10,"v":35,"z":200},{"c":2,"d":"PIEZA NUEZ 500 GRAMS","i":"000074","k":"000074","l":"null","p":"$150","u":10,"v":150,"z":200},{"c":2,"d":"PIEZA PALANQUETA 45 GRAMA C\/20 PIEZAS","i":"7503026144282","k":"7503026144282","l":"null","p":"$68","u":10,"v":68,"z":200},{"c":2,"d":"PIEZA PALANQUETA C\/ AMARANTO 45 GRAMS C\/20 PIEZAS","i":"7503003870845","k":"7503003870845","l":"null","p":"$68","u":10,"v":68,"z":200},{"c":2,"d":"PIEZA PALANQUETA REDONDA","i":"3848","k":"3848","l":"null","p":"$13.5","u":10,"v":13.5,"z":200},{"c":2,"d":"PIEZA PALOMITA NATURAL 20 PIEZAS","i":"000005","k":"000005","l":"000005","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"PIEZA PALOMITA QUESO 20  PIEZAS","i":"000006","k":"000006","l":"null","p":"$60","u":10,"v":60,"z":200},{"c":2,"d":"PIEZA PISTACHE 500 GRAMS","i":"000075","k":"000075","l":"null","p":"$150","u":10,"v":150,"z":200}],"ctg":[{"i":1,"n":"BOTANAS"},{"i":2,"n":"MAYOREO"}],"und":[{"i":10,"n":"_"}],"ngc":"B.TO BOTANAS","tel2":"+527681072905","cor2":"","dir2":"Laura Elena Silva Arteaga Padierna No.124 ,La Estacion,Actopan,Hidalgo.C.P.42800","alf":"Alfabeto","myp":"Mayor Precio","mnp":"Menor Precio","ctgs":"Categoría","orp":"Ordenar Por","bsc":"Buscar","crt":true,"nam":"Nombre","sct":"Comprar Ahora","ernw":"Error al conectarse al servidor, compruebe su conexión a internet e intente nuevamente.","img":true,"uni":false,"cla":true,"wha":true,"clo":"Cerrar","nxt":"Siguiente","prv":"Anterior","sin":"Sin información","clt":"w3-black","tmp":1788716420020,"lg":"logo"} /*#d4t4#*/;
		