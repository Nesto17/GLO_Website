const navTrigger = document.querySelector('.navigation_trigger');
const navPanel = document.querySelector('.navigation_panel');
const navBackground = document.querySelector('.navigation_background');
const navHeader = document.querySelector('.navigation');
const navBox = document.querySelector('.navigation_box');
const navDropDown = document.querySelector('.navigation_manuals');
const navManualsList = document.querySelector('.navigation_manuals_list');
const wrapper = document.querySelector('.wrapper');

const disableScrolling = () => {
    const x = window.scrollX;
    const y = window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

const enableScrolling = () => {
    window.onscroll=function(){};
}

navTrigger.addEventListener('click', () => {
    disableScrolling();

    navPanel.style.opacity = 1;
    navPanel.style['pointer-events'] = 'unset';
    setTimeout(() => {
        navBox.style.transform = 'translateY(0)';
    }, 200);
})

navBackground.addEventListener('click', () => {
    if (!navBackground.classList.contains('dropped')) {
        navBox.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            navPanel.style.opacity = 0;
            navPanel.style['pointer-events'] = 'none';
        }, 400);
        enableScrolling();
    } else {
        navManualsList.classList.remove('dropped');
        navBackground.classList.remove('dropped');
    }
});

navDropDown.addEventListener('click', () => {
    navManualsList.classList.toggle('dropped');
    navBackground.classList.toggle('dropped');
})

window.addEventListener('scroll', () => {
    const scrollAmount = window.scrollY;

    if (scrollAmount > 50) {
        navHeader.classList.add('alternate');
    } else {
        navHeader.classList.remove('alternate');
    }
})

// FORM FILE

// const formFileInput = document.querySelector('.form_file_input');
// const formFile = document.querySelector('.form_file');
// const formFileBox = document.querySelector('.form_file_box')
// const formFileBtn = document.querySelector('.form_file_button');
// const formFileThumbs = document.querySelector('.form_file_thumbs');
// // let formFileThumb = document.querySelectorAll('.form_file_thumb');

// formFileBox.addEventListener('dragover', (e) => {
//     e.preventDefault();
//     formFileBox.classList.add('over');
//     formFileBtn.classList.add('over');
// })

// const eventTypes = ['dragleave', 'dragend'].forEach(eventType => {
//     formFile.addEventListener(eventType, () => {
//         formFileBox.classList.remove('over');
//         formFileBtn.classList.remove('over');
//     })
// }) 

// const removeFile = (arr, files) => {
//     arr.forEach((element, index) => {
//         element.addEventListener('click', () => {
//             element.remove();

//         })
//     })
// }

// const updateThumb = (files) => {
//     document.querySelectorAll('.form_file_thumb').forEach(element => element.remove());

//     const values = Object.values(files);
//         values.forEach(value => {
//             const newListElement = document.createElement('li');
//             newListElement.classList.add('form_file_thumb');
//             newListElement.textContent = value.name;

//             formFileThumbs.appendChild(newListElement);
//         });
// }

// formFileBox.addEventListener('click', () => {
//     formFileInput.click();
// })

// formFileBox.addEventListener('change', () => {
//     updateThumb(formFileInput.files);

//     const formFileThumb = document.querySelectorAll('.form_file_thumb');
//     removeFile(formFileThumb, formFileInput.files);
// })

// formFileBox.addEventListener('drop', (e) => {
//     e.preventDefault();
    
//     const dataList = e.dataTransfer.files;
//     if (dataList.length) {
//         formFileInput.files = dataList;
//         // console.log(formFileInput.files);
//         updateThumb(formFileInput.files);
//     }

//     const formFileThumb = document.querySelectorAll('.form_file_thumb');
//     removeFile(formFileThumb, formFileInput.files);

//     formFileBox.classList.remove('over');
//     formFileBtn.classList.remove('over');
// })


const formInputs = document.querySelectorAll('.form_input');

formInputs.forEach((input, index) => {
    input.addEventListener('change', (e) => {
        if (e.target.value === '') {
            input.classList.remove('filled');
        } else {
            input.classList.add('filled');
            input.closest('.form_section').classList.remove('error');
        }
    })
})

let formPromptHiddens = document.querySelectorAll('.form_prompt_hidden');
let formSections = document.querySelectorAll('.form_section');
const formSubmit = document.querySelector('.form_submit');
const form = document.querySelector('.form_box');

const promptError = (element, errorText) => {
    const formNameSection = element.closest('.form_section');
    const formNamePrompt = formNameSection.querySelector('.form_prompt_hidden');
    formNameSection.classList.add('error');
    formNamePrompt.textContent = errorText;
    element.classList.add('filled');
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

formSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const formName = document.querySelector('.form_name')
    const formEmail = document.querySelector('.form_email')
    const formMessages = document.querySelector('.form_messages');

    if (!formName.value) {
        promptError(formName, 'please fill in your name');
    }
    else if (!validateEmail(formEmail.value)) {
        promptError(formEmail, 'please use a valid email');
    }
    else if (!formMessages.value) {
        promptError(formMessages, "please tell us something, we'd love to hear your stories and concerns :D");
    } 
    else {
        emailjs.sendForm('service_u2yxrse', 'template_srws4yz', form)
            .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
            console.log('FAILED...', error);
            });
        window.location.reload();
    }

})