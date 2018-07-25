var progressCookieName = 'module-progress';

function getProgress(){
    return Cookies.getJSON(progressCookieName); // => { foo: 'bar' }
}
function updateProgress(modulename, component, element, status){
    var object = Cookies.getJSON(progressCookieName);
    object[modulename].components[component].element[element].status = status;
    return object;
    Cookies.set(progressCookieName, object);
}

function createProgress(){
    
    var pcc = new module({
        'more-on-topic' : new component({
            'holistic' : new element(false),
            'olderadult' : new element(false),
        }
    )});
    var wound = new module({
        'more-on-topic' : new component({
            'holistic' : new element(false),
            'olderadult' : new element(false),
        }
    )});
    

    var progress = {'pcc' : pcc, 'wound' : wound };
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