window.addEventListener('load', init);
function init(){
  // シーンを作成
  const scene = new THREE.Scene();

  const browserSizeX = window.innerWidth;
  const browserSizeY = window.innerHeight;
  var debmessage = '';
  var pos1 = 320; 
  var pos2 = 320;
  var pos3 = 300;
  var pos4 = 220;
  var pos5 = 140;
  

/*if (window.matchMedia && window.matchMedia('(max-device-width: 780px)').matches) {
  pos1 = 180;
  pos2 = 120;
  pos3 = 310;
  pos4 = 250;
  pos5 = 190;

}
*/
var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|silk/i;
if(window.navigator.userAgent.search(regexp) !== -1){
  debmessage = 'モバイル端末';
  pos1 = 180;
  pos2 = 120;
  pos3 = 310;
  pos4 = 250;
  pos5 = 190;
  alert(debmessage);
}else{
  debmessage = 'モバイル端末ではありません';
}


  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, browserSizeX / browserSizeY);
  camera.position.set(0,0,1000);

   scene.add(camera);


  // 光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  const ambientLight = new THREE.AmbientLight(0x333333); //平行光源（色、強度）
  scene.add( ambientLight );


  //6面分のマテリアルを生成
  var loader = new THREE.TextureLoader();
  var material1 = new THREE.MeshBasicMaterial({
    map: loader.load('imgs/ITF2-1.jpg')
  })
  var material2 = new THREE.MeshBasicMaterial({
    map: loader.load('imgs/ITF2-4.jpg')
  })
  var material3 = new THREE.MeshBasicMaterial({
    map: loader.load('imgs/ITF2-5.jpg')
  })
  var material4 = new THREE.MeshBasicMaterial({
    map: loader.load('imgs/ITF2-6.jpg')
  })
  var material5 = new THREE.MeshBasicMaterial({
    map: loader.load('imgs/ITF2-3.jpg')
  })
  var material6 = new THREE.MeshBasicMaterial({
    map: loader.load('imgs/ITF2-2.jpg')
  })

      var geometry = new THREE.CubeGeometry(200, 200, 200);
      var cube = new THREE.Mesh( geometry, [material1,material2,material3,material4,material5,material6] );
      cube.name = 'sat';
  scene.add(cube);


  // 星屑を作成
  createStarField();

  function createStarField() {
    // 形状データを作成
    const geometry = new THREE.Geometry();
    for (let i = 0; i < 1000; i++) {
      geometry.vertices.push(
        new THREE.Vector3(
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5)
        )
      );
    }
    // マテリアルを作成
    const material = new THREE.PointsMaterial({
      size: 10,
      color: 0xffffff
    });

    // 物体を作成
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
  }
//ボタンを追加
var geometry = new THREE.BoxGeometry(60,60,60);
var geometryi = new THREE.PlaneGeometry( 60, 60);
var geometryii = new THREE.PlaneGeometry( 150, 60);
var material = new THREE.MeshPhongMaterial( { color: '#ffffff' } );
var materialbk = new THREE.MeshPhongMaterial( { color: '#000000' } );

var materialb1 = new THREE.MeshBasicMaterial({
  map: loader.load('imgs/up.jpg')
})
var materialb2 = new THREE.MeshBasicMaterial({
  map: loader.load('imgs/down.jpg')
})
var materialb3 = new THREE.MeshBasicMaterial({
  map: loader.load('imgs/right.jpg')
})
var materialb4 = new THREE.MeshBasicMaterial({
  map: loader.load('imgs/left.jpg')
})
var materialb5 = new THREE.MeshBasicMaterial({
  map: loader.load('imgs/button1.jpg')
})
var materialb6 = new THREE.MeshBasicMaterial({
  map: loader.load('imgs/button2.jpg')
})
var materialb7 = new THREE.MeshBasicMaterial({
  map: loader.load('imgs/button3.jpg')
})
var button1 = new THREE.Mesh( geometryi, materialb1 );
button1.position.set(0, pos1, 0);
button1.name = 'up';
var button2 = new THREE.Mesh( geometryi,materialb2 );
button2.position.set(0, -pos1, 0);
button2.name = 'down';
var button3 = new THREE.Mesh( geometryi,materialb3 );
button3.position.set(pos1, 0, 0);
button3.name = 'right';
var button4 = new THREE.Mesh( geometryi,materialb4 );
button4.position.set(-pos1, 0, 0);
button4.name = 'left';
var button5 = new THREE.Mesh( geometryii,materialbk );
button5.position.set(800, -400, 0);
button5.name = 'debug';
var button6 = new THREE.Mesh( geometryii,materialb5 );
button6.position.set(-pos2, pos3, 0);
button6.name = 'ertextbox';
var button7 = new THREE.Mesh( geometryii,materialb7 );
button7.position.set(-pos2, pos4, 0);
button7.name = 'itf2detail';
var button8 = new THREE.Mesh( geometryii,materialb6 );
button8.position.set(-pos2, pos5, 0);
button8.name = 'gototop';

scene.add( button1,button2,button3,button4,button5,button6,button7,button8);



  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#myCanvas')});
  renderer.setSize(window.innerWidth, window.innerHeight);

  // マウスクリックイベントのリスナー登録
  document.addEventListener( 'mousedown', clickPosition, false );

setTimeout(render, 300)
  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
//            cube.rotation.x += ;
//            cube.rotation.y += 0.01;

  }

//初期回転
  var i = 1;
  function myLoop () {
     setTimeout(function () {
        cube.rotation.x += 0.314;
        cube.rotation.y += 0.0785;
        i++;
        if (i < 41) {
           myLoop();
        }
     }, 50)
  }
  myLoop();

function details(){
  //var message = null;
  var dom = document.getElementById("dqboard");
                  if (message) {
                      dom.style.visibility = "visible";
                      var dom_message = document.getElementById("message1");
                      dom_message.innerHTML = message;
                  } else {
                      dom.style.visibility = "hidden";
                  }
}
var messagenum = 0;
function changemessage(){
    if (messagenum == 0){
      message = "衛星を自由に動かしてみてください！";
      messagenum ++ ;
      //alert("デバッグ"+messagenum);
    }else if (messagenum == 1){
      message = "この衛星は筑波大学「結」プロジェクトが開発した超小型衛星 ITF-2 です．<br>サイズは1U(110.5×108.0×111.5mm)，質量 約1.39kgです．";
      messagenum ++ ;
    }else if (messagenum == 2){
      message = "2017年1月16日にISSより放出，日本時間2019年1月4日の明け方に大気圏に再突入し運用を終了しました．";
      messagenum ++ ;
    }else{
      message = "初期位置に戻したい場合はページをリロードしてください．"
    messagenum = 1; 
    }
    
    details();
}
var debugnum = 0;
function debugmenu(){
  if (debugnum >= 10){
    alert("デバッグ\nwindowsize:"+window.innerWidth+"x"+window.innerHeight+"\nmessage:"+message+"\ndebugnum:"+debugnum+"\nmessagenum:"+messagenum+"\ndebmessage:"+debmessage+"\nregexp\n(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|silk)なら-1以外:"+window.navigator.userAgent.search(regexp));
  }
}

function clickPosition( event ) {
// 画面上のマウスクリック位置
var x = event.clientX;
var y = event.clientY;

// マウスクリック位置を正規化
var mouse = new THREE.Vector2();
mouse.x =  ( x / window.innerWidth ) * 2 - 1;
mouse.y = -( y / window.innerHeight ) * 2 + 1;

// Raycasterインスタンス作成
var raycaster = new THREE.Raycaster();
// 取得したX、Y座標でrayの位置を更新
raycaster.setFromCamera( mouse, camera );
// オブジェクトの取得
var intersects = "none" ;
intersects = raycaster.intersectObjects( scene.children );


if (intersects == "none"){
  message = null;
  details();
}else{
switch (intersects[0].object.name){
  case 'sat':
  changemessage();
  break;

  case 'up':
  cube.rotation.x -= 0.523;
  break;

  case 'down':
  cube.rotation.x += 0.523;
  break;

  case 'right':
  cube.rotation.y += 0.523;
  break;

  case 'left':
  cube.rotation.y -= 0.523;
  break;

  case 'debug':
  debugnum ++;
  debugmenu();
  break;

  case 'ertextbox':
  message = null;
  details();
  break;

  case 'gototop':
    window.location = "https://yui.kz.tsukuba.ac.jp/";
    break;
  
    case 'itf2detail':
      window.location = "https://yui.kz.tsukuba.ac.jp/%e3%83%97%e3%83%ad%e3%82%b8%e3%82%a7%e3%82%af%e3%83%88/itf-2/";
      break;

  default:
  message = "オブジェクトが取得されませんでした．";

  break;
}
}
}
}
