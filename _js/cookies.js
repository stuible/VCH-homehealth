var progressCookieName = 'module-progress';

function getProgress(modulename, component, element){

    var object = Cookies.getJSON(progressCookieName);

    if (component === undefined){
        return object[modulename];
    }
    else if (element === undefined){
        return object[modulename].components[component];
    }
    else {
        return object[modulename].components[component].element[element].status;
    }
}

function updateProgress(modulename, component, element, status){
    var object = Cookies.getJSON(progressCookieName);
    object[modulename].components[component].element[element].status = status;
    Cookies.set(progressCookieName, object);
    return object;
}

//Set up cookie "Schema"
function createProgress(){

    var progress = {};

    for (var i = 0; i < modules.length; i++) {
        
        progress[modules[i]] = new module({
            'objectives' : new component({
                'objectives' : new element(false),
            }),
            'case-study' : new component({
                'margret' : new element(false),
                'franny' : new element(false),
                'luigi' : new element(false),
                'agit' : new element(false),
            }),
            'more-on-topic' : new component({
                'holisticcare' : new element(false),
                'careofanolderadult' : new element(false),
                'chronicconditions' : new element(false),
                'careplanning' : new element(false),
                'deliverables&quiz' : new element(false),
            })
    });

    }

    // var progress = {'pcc' : pcc, 'wound' : wound };
    Cookies.set(progressCookieName, progress);
}

function module(components)
{
   this.components=components;
}
function component(element){
    this.element=element;
}
function element(status){
    this.status=status;
}