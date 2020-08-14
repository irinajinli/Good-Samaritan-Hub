export const getDateDiff = (post) => {
    const today = new Date();
    const dateDiffs = [dateDiff.inDays, dateDiff.inWeeks, dateDiff.inMonths, dateDiff.inYears];
    let i;
    let diff = 0;
    for (i = 0; i < 4; i++) {
        if (dateDiffs[i](post.date, today) === 0) {
            break;
        }
        diff = dateDiffs[i](post.date, today);
    }
    if (i > 0) { i-- };

    const map = { 0: 'day', 1: 'week', 2: 'month', 3: 'year'};
    let diffString = `${diff}`
    diffString = diffString.concat(` ${map[i]}${diff === 1? '' : 's'} ago`);

    if (diffString === '0 days ago') {
        return 'today';
    } else {
        return diffString;
    }
}

// Modified from https://stackoverflow.com/questions/7763327/how-to-calculate-date-difference-in-javascript
const dateDiff = {

    inDays: function(d1, d2) {
        let t2 = d2.getDate();
        let t1 = d1.getDate();
        let intDiff = t2-t1;

        t2 = d2.getTime();
        t1 = d1.getTime();
        let exactDiff=(t2-t1)/(24*3600*1000);

        return parseInt(Math.max(intDiff, exactDiff));
    },

    inWeeks: function(d1, d2) {
        let t2 = d2.getTime();
        let t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    },

    inMonths: function(d1, d2) {
        let d1Y = d1.getFullYear();
        let d2Y = d2.getFullYear();
        let d1M = d1.getMonth();
        let d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    inYears: function(d1, d2) {
        let d1Y = d1.getFullYear();
        let d2Y = d2.getFullYear();
        let d1M = d1.getMonth();
        let d2M = d2.getMonth();

        let inMonths = (d2M+12*d2Y)-(d1M+12*d1Y);

        return parseInt(inMonths/12);
    }
}