'use strict';

// Make navbar transparent when it is on the top
// 도큐먼트 쿼리셀렉터로 원하는 엘레멘트 받아와서 변수할당
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// 스크롤이 될때마다 작성한 로직이 실행되게 하라
document.addEventListener('scroll', () => {
    // console.log(window.scrollY);
    console.log(`navbarHeight : ${navbarHeight}`);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark')
    } else {
        navbar.classList.remove('navbar--dark');
    }
});


// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
//navbarMenu에 이벤트를 추가할 건데, 클릭한 요소에 다음의 함수를 실행하게 한다
navbarMenu.addEventListener('click', (event) => {
    // 다른부분 찍엇을때 undefined 찍히는 현상 방지
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});


// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});




// handle click on the conctact me button on home!
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {

    scrollIntoView('#contact');
});

//Make home slowly fade to transparent as the window scrolls down
//document.querySelector를 이용해 #home을 가져와서 변수에 할당하기
// home 배경말고 안에 내용만 투명도 조절
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
//스크롤할때 이벤트 등록
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
    console.log(1 - window.scrollY / homeHeight);
    //ex)
    //1 - '(0 / 800)= 1' = 1(opacity)
    //1 - '(400 / 800)= 0.5' = 0.5(opacity)
    //1 - '(800 / 800)= 0' = 0(opacity)
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up') 
document.addEventListener('scroll', () => {
    // 윈도우 스크롤이 홈높이의 반정도 도달했을 때
    if(window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});

//Projects filtering****************************************************************
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    //숫자 span클릭시 = filter가 텅빈 undefined라면 or ||연산자 추가해서 e.target의 부모노드의 dataset filter값을 적용하라
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }

    //Remove selection from the previous item and select the new one
    const active = document.querySelector('.category__btn.selected')
    active.classList.remove('selected');
    // ? : 문법 = ? 앞의 조건이 맞으면 ? 다음실행하고, 아니면 : 다음을 실행
    // = span일때를 말함
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');


    // 사라지는애니메이션 추가-> 필터링 -> 0.3초 뒤에 다시 나타나는 애니메이션 순서
    projectContainer.classList.add('anim-out');

    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);

    // // 위의 forEach문과 같은 공식 2가지
    // //    1.     = 
    // console.log(`----------`);
    // for(let project of projects) {
    //     console.log(project);
    // }
    // //    2.     = 
    // console.log(`----------`);
    // let project;
    // for(let i = 0; i < projects.length; i++ ) {
    //     project = projects[i];
    //     console.log(project);
    // }

});


//스크롤이벤트 중복부분은 함수로 지정 : 함수명은 임의로 지정, selector만 추가하면 함수 실행되게 함
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: "smooth" });
}

// const toggleBtn = document.querySelector('.navbar__toggle-btn');
// const navbarMenu = document.querySelector('.navbar__menu');
// toggleBtn.addEventListener('click', () => {
//     navbarMenu.style.display = "block";
// });