
/**
 * Completa el campo y lo hace visible, al sacarle la clase .fill_field
 * @param $parent jQuery Object del padre contenedor
 * @param field  string, representando el "child"
 * @param value string
 */
function fillField($parent, field, value){
    if(value) {
        var $child = $parent.find(field);
        $child.text(value);
        $child.toggleClass('fill_field');
    }
}


function fillFields($parent, fields_values){
    for (var field in fields_values){
        fillField($parent,field, fields_values[field]);
    }
}

function fillFontAwasomeIcon($parent, field, iconClass) {
    var $child = $parent.find(field);
    $child.addClass(iconClass);
    $child.toggleClass('fill_field');
}


function fillBioLink(field,url){
    if(url){
        var $child = $(field);
        $child.prop('href',url);
        $child.toggleClass('fill_field');
    }
}

/**
 * Fill the fields based on config.js, and set the site in this mode enabled!
 */
function initUnderConstructionMode() {
    var $section = $('#under_construction_section');
    //Loads the message and icon
    var underConstructionFileds = {
        'span.header': config.under_construction.header,
        'span.description': config.under_construction.description,
    };

    fillFields($section, underConstructionFileds);
    fillFontAwasomeIcon($section, 'i', config.under_construction.fa_icon_class);
    $('body').addClass('mode_underconstruction');
}


function calculateAge(birthday) {
    var ageDifMs = Date.now() - new Date(birthday+' 0:00');
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * Fill all the Bio's fields
 */
function fillBioFields(bio) {

    $sectionBio = $('.section-1');
    var bioFileds = {
        '.last_name': bio.last_name,
        '.name': bio.name,
        '.age': calculateAge(bio.birthday),

        '.brief': bio.brief,
        '.description': bio.description,

        '.location': bio.location,

        '.company_name': bio.job.company.name,
        '.role': bio.job.role,
    };

    //Set the images and link
    $('img#country_flag').prop('src', bio.country_flag_url);
    $('img#company_logo').prop('src', bio.job.company.logo);

    $('a#company_website').prop('href', bio.job.company.website);

    fillFields($sectionBio,bioFileds);

    // Load the links
    fillBioLink('a.mail','mailto:'+bio.links.mail);
    fillBioLink('a.web',bio.links.web);
    fillBioLink('a.linkedin',bio.links.linkedin);
    fillBioLink('a.github',bio.links.github);
    fillBioLink('a.gitlab',bio.links.gitlab);
    fillBioLink('a.youtube',bio.links.youtube);

    if(bio.links.enable_cv){
        //enable the link

        var $cv_link =  $('a.cv');
        $cv_link.prop('href','download/cv.pdf');
        $cv_link.toggleClass('fill_field');
    }
}

/**
 * Fill all the CV's fields
 */
function fillCVFields(cv) {
    $CVSection = $('.section-2');
    fillField($CVSection,'.interests',cv.interests)

    var $skillsContainer = $('p.skills');
    for (var item in cv.skills){
        var skill = cv.skills[item];
        $skillsContainer.append('<i class="'+skill.fa_logo+'" title="'+skill.title+' '+skill.level+'" style="opacity: '+skill.level+';"></i>');
    }

    $skillsContainer.toggleClass('fill_field');
}
function initProfile() {
    if (config.under_construction.enabled) {
        initUnderConstructionMode();
    } else {
        $('body').addClass('mode_profile');

        //fetch JSONs files, and fill all fields
        fetch('data/bio.json')
            .then(function (response) {
                return response.json();
            })
            .then(function(bio) {
                //set the web's title
                document.title= bio.name+' '+bio.last_name;

                //Fill fields
                fillBioFields(bio);
            });


        fetch('data/cv.json')
            .then(function (response) {
                return response.json();
            })
            .then(function(cv) {
                //Fill all the CV's fields
                fillCVFields(cv);
            });
    }
}
