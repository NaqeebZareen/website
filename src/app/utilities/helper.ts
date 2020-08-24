import { DBkeys } from '../services/dbkeys/db-keys';
import { LocalStorageFactoryService } from '../services/localStorageFactory/local-storage-factory.service';
import { IEventLog } from '../models/event-log';
declare var $: any;

export const isTokenExpired = () => {

    let tokenExp = Date.parse(localStorage.getItem(DBkeys.TOKEN_CREATED_TIME));
    let currenTime = Date.now();
    if (tokenExp < currenTime) {
        return false;
    }
    return true;
}

//  activitiesName = {
//     'Sports',
//      'Music and Concerts',
//     'Outdoor Activities',
//    'Family and Kids',
//     'Health and Fitness',
//    'Socialization and Networking',
//     'Sightseeing and Tourism',
//   'Books and Hobbies',
//    'Books and Hobbies ',
//    'Arts and Performance',
//     'Shopping and Fashion',
//     'Tech and Workshops',
//    'Food and Festival',
//   'Politics',
//  'Charity and Volunteer work'
//   };

// export const fnsuggg = () => {
//     this.srvAccountService.getInterestList().subscribe(res => {
//         console.log(res);
//     });
// }

export const fnSuggestedInterest = () => {


    let suggestedArrayList;
    // = [
    //     "Sports",
    //     "Music and Concerts",
    //     "Outdoor Activities",
    //     "Family and Kids",
    //     "Health and Fitness",
    //     "Socialization and Networking",
    //     "Sightseeing and Tourism",
    //     "Books and Hobbies",
    //     "Arts and Performance",
    //     "Shopping and Fashion",
    //     "Tech and Workshops",
    //     "Food and Festival",
    //     "Politics",
    //     "Charity and Volunteer work"

    // ]

    let res = localStorage.getItem('interest');
    res = JSON.parse(res);
    suggestedArrayList = res;

    if (res === null) {
        res = localStorage.getItem('interest');
        res = JSON.parse(res);
        suggestedArrayList = res;
    }
    // console.log(res, "tres");
    // console.log(suggestedArrayList, "b");

    return suggestedArrayList;
}
export const fnHorizentalScroll = () => {
    $('#carouselExample').on('slide.bs.carousel', function (e) {

        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 4;
        var totalItems = $('.carousel-item').length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                }
                else {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                }
            }
        }
    });



}