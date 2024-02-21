export const checkHit = (missile, body) => {
    let withinBodyWidth = missile.position.x >= body.position.x && missile.position.x <= body.position.x + body.width;
    let withinBodyHeight = missile.position.y <= body.position.y + body.height && missile.position.y >= body.position.y;
    
    if( withinBodyWidth && withinBodyHeight){
        //console.log('hit occured');
        return true;
    }
    return false;
}