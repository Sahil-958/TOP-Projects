const themeButtonLight=document.getElementById("themeBtnLight");
themeButtonLight.addEventListener('click',e=>switchTheme(e));

const themeButtonDark=document.getElementById("themeBtnDark");
themeButtonDark.addEventListener('click',e=>switchTheme(e));

const projects=document.querySelectorAll('.project');
projects.forEach(project => {
    project.addEventListener('click',e=>showFrame(e));
});

document.getElementById('closeOverlay').addEventListener('click', ()=>closeOverlay());

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeOverlay();
    }
});


function switchTheme(e) {
    e.target.classList.toggle('hide');
    e.target.id==="themeBtnDark"?themeButtonLight.classList.toggle('hide'):themeButtonDark.classList.toggle('hide');
    let bodyClassList=document.body.classList;
    bodyClassList.toggle('dark-theme');
}

function showFrame(e) {
    let target = e.currentTarget.id.trim(); // Trim any leading or trailing spaces
    console.log(target);
    console.log(e);
    let baseURL = "https://sahil-958.github.io/The-Odin-Project-Learnings/";
    let iframeURL= baseURL + target + "/";
    console.log(iframeURL);

    // Set the src attribute of the iframe
    document.getElementById('iframe').src = iframeURL;

        // Add 'show' class to overlay content
        document.querySelector('.overlay-content').classList.add('show');

        // Add 'show' class to overlay
        document.getElementById('overlay').classList.add('show');
}

function closeOverlay() {
        // remove 'show' class to overlay content
        document.querySelector('.overlay-content').classList.remove('show');

        // remove 'show' class to overlay
        document.getElementById('overlay').classList.remove('show');
}