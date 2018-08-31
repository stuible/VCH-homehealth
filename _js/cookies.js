var progressCookieName = 'module-progress';

function getProgress(modulename, component, element){

    console.log("getting progress for " + modulename + ": " + component + " | " + element);

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
    console.log(component + " | " + element + " | " + status);
    var object = Cookies.getJSON(progressCookieName);
    object[modulename].components[component].element[element].status = status;
    Cookies.set(progressCookieName, object);
    return object;
}

//Set up cookie "Schema"
function createProgress(){

    var progress = {};

    var introMoreOnTopic = {
        'intro' : new element(false),
        'clinicians' : new element(false),
        'environment' : new element(false),
        'hand-hygiene' : new element(false),
        'deliverables' : new element(false),
    };

    var PCCMoreOnTopic = {
        'holistic' : new element(false),
        'older-adult' : new element(false),
        'chronic' : new element(false),
        'med-management' : new element(false),
        'deliverables' : new element(false),
    };

    pushToProgress(progress, [introMoreOnTopic, PCCMoreOnTopic]);

    Cookies.set(progressCookieName, progress);
}

function pushToProgress(progress, moreOnTopicArray){
    for (var i = 0; i < modules.length; i++) {

        var moreOnTopic = {
                '0' : new element(false),
                '1' : new element(false),
                '2' : new element(false),
                '3' : new element(false),
                '4' : new element(false),
        };
        if(moreOnTopicArray[i]){
            moreOnTopic = moreOnTopicArray[i];
        }
        
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
            'more-on-topic' : new component(moreOnTopic)
    });

    }
}

function module(components){
   this.components=components;
}
function component(element){
    this.element=element;
}
function element(status){
    this.status=status;
}