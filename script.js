var container, stats; //container to keep the planets
var camera, controls, scene, render; 
var info;
var cube;
var sphereTab = [];
var objects = [];
var parent2;

//planet
var sun;
var sun2;
var sun3;
var currentcolor;
var cubeNul;
var earthPivot;
var earthPivot2;

var p1 = {color : '0x808080'}
var p2 = {color : '0xf1c232'}   
var p3 = {color : '#3d85c6'} 

//mesh
var mesh;
//view angle
var planetViewed = 0;

init(); // function call 
animate(); // make a move ! rotation, position change


// jQuery  : Query (search for javascript ) to simplify usage. 
// 웹페이지를 정상적으로 화면에 띄워주기 위해 필요한 준비물들을 resource라고 한다.
// load : resource를 다 받아와서 웹페이지가 정상적으로 브라우저에 띄워져있다.
$(window).on('load', function() {
    // TweenMax는 css가 변경될때 자연스럽게 보이도록 해주는 함수
    // 애니메이션 사용시 자주 사용된다. 
    TweenMax.to($('#welcome'), 1, {
        css : {
            opacity: 1
        },
        ease : Quad.easeInOut,
    });
    TweenMax.to($('#social'), 0.5, {
        css : {
            bottom : '20px'
        }, delay : 0.5,
        ease : Quad.easeInOut,
    });
    TweenMax.to($('#border'), 1, {
        css : {
            height: '200px',
        },
        delay : 0.5,
        ease : Quad.easeInOut,
    });
});

function hideWelcome(){
    TweenMax.to($('#welcome'), 0.5, {
        css : {
            opacity : 0
        }, 
        ease : Quad.easeInOut
    });
    TweenMax.to($('#welcome'), 0.5, {
        css : {
            display : 'none'
        }, 
        delay : 1,
        ease : Quad.easeInOut
    });
}


function init(){
    camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 70;
    controls = new THREE.OrbitControls(camera);
    controls.maxDistance = 300;
    controls.minDistance = 30;

    scene = new THREE.Scene();
    var geoSphere = new THREE.SphereGeometry(Math.random()*1, 20, 20)
    for (var i = 0; i < 500; i++){
        lumiereS = new THREE.MeshPhongMaterial({
            emissive : '#fff'
        })
        sphereTab.push(new THREE.Mesh(new THREE.SphereGeometry(Math.random() *1, 20, 20, lumiereS)))
    }// for loop
    var posX = -3000;
    var posY = -3000;
    
    for (var i = 0; i < sphereTab.length; i++){
        //position.set(x,y,z)
        sphereTab[i].position.set(Math.random() * 600 -300, Math.random() *600-300, Math.random() *6)
        scene.add(sphereTab[i]);
    }

    // Sun 
    // MeshPhongMaterial : 반사 하이라이트가 있는, 광택 표면의 재질을 나타낼때 사용하는 메소드
    var pinkMat = new THREE.MeshPhongMaterial({
        color : 0xf66120,
        emissive : 0xf66120,
        specular : 0xffed22,
        shininess : 10,
        shading : THREE.FlatShading,
        transparent : 1, 
        opacity : 1
    }); 

    var pinkMat2 = new THREE.MeshPhongMaterial({
        color : 0xf66120,
        emissive : 0xf66120,
        specular : 0xffed22,
        shininess : 10,
        shading : THREE.FlatShading,
        transparent : 1, 
        opacity : 1
    })

    var geometry = new THREE.IcosahedronGeometry(3,1);
    var geometry2 = new THREE.IcosahedronGeometry(2.5,1);
    var geometry4 = new THREE.IcosahedronGeometry(3,1);

    //material 
    // color, emissive (빛의 산포도 (퍼지는 정도)를 의미한다. )
    var material = new THREE.MeshPhongMaterial({
        color : 0x008080,
        emissive : 0x74DF55, // yellow
        shading : THREE.FlatShading
    });
    var material2 = new THREE.MeshPhongMaterial({
        color : 0xceb9ff,
        emissive : 0xffc12d,
        shading : THREE.FlatShading
    });
    var material4 = new THREE.MeshPhongMaterial({
        color : 0xf1c232,
        emissive : 0x652CDF,
        shading : THREE.FlatShading

    });

    sun = new THREE.Mesh(new THREE.IcosahedronGeometry(10, 1), pinkMat);
    scene.add(sun);
    objects.push(sun);

    sun2 = new THREE.Mesh(new THREE.IcosahedronGeometry(10, 1), pinkMat2);
    sun2.rotation.x = 1 ;
    scene.add(sun2);
    objects.push(sun2);

    sun3 = new THREE.Mesh(new THREE.IcosahedronGeometry(10, 1), pinkMat2);
    sun3.rotation.x = 1;
    scene.add(sun3);
    objects.push(sun3);

    // Object3D <- 3D 모형을 만들 수 있는 객체
    earthPivot3 = new THREE.Object3D();
    sun.add(earthPivot3); 

    var radius = 16;
    var tubeRadius = 0.03;
    var radialSegments = 8 * 10 ;
    var tubularSegments = 6 * 15;
    var arc = Math.PI * 3 ; // -0.5 * Math.PI -> 반시계 방향으로 90도 회전
    
    // 도넛 모양 고리 (얇은 고리로 생성)
    var geometry3 = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments, arc);
    var material3 = new THREE.MeshLambertMaterial({
        color : 0xffffff,
        emissive : 0xffffff,
        shading : THREE.FlatShading
    });
    mesh = new THREE.Mesh(geometry3, material3);
    earthPivot3.add(mesh);

    // planet 1//
    earthPivot = new THREE.Object3D();
    sun.add(earthPivot);
    var earth = new THREE.Mesh(geometry, material); 
    earth.position.x=15;
    earthPivot.add(earth);
    objects.push(earth);

    // planet 2//
    earthPivot2 = new THREE.Object3D();
    sun.add(earthPivot2);
    var earth2 = new THREE.Mesh(geometry2, material2);
    earth2.position.x=20;
    earthPivot2.add(earth2);
    objects.push(earth2);

    // planet 3//
    earthPivot4 = new THREE.Object3D();
    sun.add(earthPivot4);
    var earth3 = new THREE.Mesh(geometry4, material4);
    earth3.position.x=26;
    earthPivot4.add(earth3);
    objects.push(earth3);

    //lights 
    lights = new THREE.DirectionalLight(0x4f4f4f);
    lights.position.set(4,4,4);
    scene.add(lights);
    
    lights = new THREE.DirectionalLight(0x4f4f4f);
    lights.position.set(-4,-4,-4);
    scene.add(lights);
    
    // render
    renderer = new THREE.WebGLRenderer({
        antialias : true
    });

    renderer.sortObjects = false;
    renderer.setClearColor(0x131A3D, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Javascript(근육) 만든 이미지들을 html(뼈대) 구조에 연결을 해줘야 함 
    container = document.getElementById('container'); // index.html 안에 container라는 id를 search해서 그 위치 값을 가져온다.
    
    // container 위치 안에 자식 태그들을 추가로 삽입한다. (넣어준다)
    container.appendChild(renderer.domElement);
    // 자식태그란 ? 태그 안에 있는 태그를 의미 , 부모 태그란 ? 상위에 있는 태그를 의미
    // window  -> 브라우저 창을 의미, 
    // window를 호출했다는 것은 브라우저를 직접 작동 시킬 수 있다는 뜻
    // 사용자가 event를 직접 만들어서 브라우저에 add 하겠다.
    // Listener -> 이벤트가 발생할 것을 대기하라 (듣고 있어라)
    window.addEventListener('resize', onWindowResize, false);

    info = document.getElementById('contentTitle');
    subtitle = document.getElementById("subtitle");
    description = document.getElementById("description");
    var universe = document.getElementById("universe");

} // init <-초기화 함수, 제일 먼저 실행될 함수

// python function : def function (a, b) :
// Javascript function 
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function setFromCamera(raycaster, coords, origin){
    raycaster.ray.origin.copy(camera.position);
    raycaster.ray.direction.set(coords.x, coords.y, 0.5).unproject(camera).sub(camera.position).normalize();
    
}

//Mouse Down event
//Web event-->
//click, scroll, type, exit, specific key
//there is event detecting js methods
// it is not detecting all events that are happening
//Use window.addEventListener to define what event it is tracking
function onMouseDown(event){
    //Raycaster is a method that shows rays in the screen
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    //tracking where the mouse was clicked
    mouse.x=(event.clientX / renderer.domElement.width)*2-1;
    mouse.y=-(event.clientY / renderer.domElement.height)*2+1;
    setFromCamera(raycaster, mouse, camera);
    var intersects = raycaster.intersectObjects(objects);
    //hex -> RGB
    currentcolor = intersects[0].object.material.color.getHex();
    if (intersects.length > 0){
        console.log(currentcolor);
        switch (intersects[0].object.geometry.type){
            case 'IcosahedronGeometry':
                if (currentcolor == '0xf66120'){
                    if (planetViewed == 0){
                        hideWelcome();
                        planetViewed=1;
                        TweenMax.from($('#content'),0.5,{
                            css :{
                                left:'-500px'
                            },
                            delay:0.5,
                            ease:Quad.easeInOut
                        });
                        TweenMax.from($('#border'),0.5,{
                            css :{
                                height:'0px'
                            },
                            delay:1,
                            ease:Quad.easeInOut
                        });
                        info.innerHTML = "<span> The Sun </span>"
                        description.innerHTML = "The sun is at the center of the solar system and is the closest star to Acheron, the only planet in the Goldilock Zone in this solar system. Many planets, including the Acheron, and celestial bodies such as asteroids, meteors, and comets revolve around it."
                    }
                    if(planetViewed == 2 || planetViewed == 3 || planetViewed == 4){
                        planetViewed = 1;
                        TweenMax.from($('#content'),0.5,{
                            css :{
                                left:'0px'
                            },
                            ease:Quad.easeInOut
                        });
                        TweenMax.from($('#border'),0.2,{
                            css :{
                                height:'200px'
                            },
                            delay :1,
                            ease:Quad.easeInOut
                        });
                        TweenMax.from($('#border'),0.5,{
                            css :{
                                height:'0px'
                            },
                            delay:0.5,
                            ease:Quad.easeInOut
                        });
                    }
                }
                if (currentcolor == '0x008080'){
                    if(planetViewed == 1 || planetViewed == 3 || planetViewed == 4){
                        planetViewed = 2;

                        info.innerHTML = "<span> Tulia </span>"
                        description.innerHTML = "The hottest planet in this solar system. Thick clouds surround the planet trapping heat during the day and releasing it in the night with temperatures up to 847 degrees celcius. "
 
                        
                        TweenMax.from($('#content'),0.5,{
                            css :{
                                left:'0px'
                            },
                            ease:Quad.easeInOut
                        });
                        TweenMax.from($('#border'),0.2,{
                            css :{
                                height:'200px'
                            },
                            delay :1,
                            ease:Quad.easeInOut
                        });
                        TweenMax.from($('#border'),0.5,{
                            css :{
                                height:'0px'
                            },
                            delay:0.5,
                            ease:Quad.easeInOut
                        });
                    }
                }
                if (currentcolor == '0xceb9ff'){
                    if(planetViewed == 1 || planetViewed == 2 || planetViewed == 4){
                        planetViewed = 3;
                        info.innerHTML = "<span> Acheron </span>"
                        description.innerHTML = "The only planet in this solar system that can sustain life. During the day, the temperature rises up to 30 degrees celcius and 10 degrees celcius in the night, allowing life."
                        TweenMax.from($('#content'),0.5,{
                            css :{
                                left:'0px'
                            },
                            ease:Quad.easeInOut
                        });
                        TweenMax.from($('#border'),0.2,{
                            css :{
                                height:'200px'
                            },
                            delay :1,
                            ease:Quad.easeInOut
                        });
                        TweenMax.from($('#border'),0.5,{
                            css :{
                                height:'0px'
                            },
                            delay:0.5,
                            ease:Quad.easeInOut
                        });
                    }
                }
                if (currentcolor == '0xf1c232'){
                    if(planetViewed == 1 || planetViewed == 2 || planetViewed == 3){
                        planetViewed = 4;
                        info.innerHTML = "<span> Udarvis </span>"
                        description.innerHTML = "The coldest planet in this solar system. Its ocean is full og freezing liquid nitrogen which is almost to the point of absolute zero."
                        TweenMax.from($('#content'),0.5,{
                            css :{
                                left:'0px'
                            },
                            ease:Quad.easeInOut
                        });
                        TweenMax.from($('#border'),0.2,{
                            css :{
                                height:'200px'
                            },
                            delay :1,
                            ease:Quad.easeInOut
                        });
                        TweenMax.from($('#border'),0.5,{
                            css :{
                                height:'0px'
                            },
                            delay:0.5,
                            ease:Quad.easeInOut
                        });
                    }
                }
                break;
        }
    }
}

document.addEventListener('mousedown', onMouseDown, false);

// animation 효과 주기 
function animate() {
    // 1s -> 1000ms
    var timer = Date.now() * 0.00001;
    // i, il을 초기화 하고, i가 il보다 작을 동안만 반복문 실행, 실행될 때마다 i++ = i +1
    for (var i = 0, il = sphereTab.length ; i < il; i++){
        var sfere = sphereTab[i]
        sfere.position.x = 400 * Math.sin(timer + i);
        sfere.position.z = 400 * Math.sin(timer+i * 1.1);
    }

    // 위에서 만들어준 행성들의 위치를 하나씩 바꿔준다. 
    sun.rotation.x += 0.008;
    sun2.rotation.y += 0.008;
    sun3.rotation.z += 0.008;

    // rotation 속도를 0.1초 단위로 자유자재로 변경한다. 
    earthPivot.rotation.z += 0.006;
    earthPivot2.rotation.z += 0.01;
    earthPivot3.rotation.y += 0.001;
    earthPivot4.rotation.z += 0.008;

    // 변경되는 Rotation값과 position값이 실시간으로(real time) html에 반영하기 위해
    // 호출하는 함수 requestAnimationFrame(함수이름)
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene,camera)
}
