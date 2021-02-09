let vueCalendar = new Vue({
    el: "#app-calendar",
    // Дані для календаря
    data: {
        currentYear: new Date().getFullYear(),
        currentMonth: "",
        currentMonthDaysAmount: 0,
        currentDay: 0,
        date: "Set any date",
        months: [
            { name: "January", days: 31 },
            { name: "February", days: 28 },
            { name: "March", days: 31 },
            { name: "April", days: 30 },
            { name: "May", days: 31 },
            { name: "June", days: 30 },
            { name: "July", days: 31 },
            { name: "August", days: 31 },
            { name: "September", days: 30 },
            { name: "October", days: 31 },
            { name: "November", days: 30 },
            { name: "December", days: 31 }
        ]
    },
    // Функції календаря
    methods: {
        prevYear() {
            this.currentYear--;
            this.bissextileYear();
        },
        nextYear() {
            this.currentYear++;
            this.bissextileYear();
        },
        bissextileYear() {
            if (this.currentYear % 4 === 0) {
                this.months[1].days = 29;
            }
            else {
                this.months[1].days = 28;
            }
        },
        getDaysAmount() {
            let month = this.months.filter(month => this.currentMonth === month.name);
            this.currentMonthDaysAmount = month[0].days;
            return this.currentMonthDaysAmount;
        },
        setCurrentDay(e) {
            this.currentDay = Number(e.target.id);
            this.toggleDays(e.target);
        },
        setDate() {
            if (this.currentDay === 0 || (this.currentDay > 28 && this.currentMonth === "February" && this.currentYear % 4 !== 0)) {
                this.date = "Set a Day!";
            } else {
                this.date = `${this.currentDay}/${this.currentMonth}/${this.currentYear}`;
            }
            return this.date;
        },
        cancelDate() {
            for (let i = 0; i < this.currentMonthDaysAmount; i++) {
                let days = document.getElementsByClassName('day')[i];
                if (days.classList.contains('active-day')) {
                    days.classList.remove('active-day');
                }
            }
            this.currentDay = 0;
            this.currentMonth = this.months[new Date().getMonth()].name;
            this.currentYear = new Date().getFullYear();
            this.date = "Set any Date";
        },
        today() {
            let date = new Date();
            this.toggleDays(document.getElementById(`${date.getDate()}`));
            this.currentDay = date.getDate();
            this.currentMonth = this.months[date.getMonth()].name;
            this.currentYear = date.getFullYear();
            this.date = `${this.currentDay}/${this.currentMonth}/${this.currentYear}`;
        },
        toggleDays(el) {
            for (let i = 0; i < this.currentMonthDaysAmount; i++) {
                let days = document.getElementsByClassName('day')[i];
                if (days.classList.contains('active-day')) {
                    days.classList.remove('active-day');
                }
            }
            el.classList.add('active-day');
        }
    },
    // Методи для високосних років
    beforeMount() {
        this.currentMonth = this.months[new Date().getMonth()].name;
    },
    mounted() {
        this.bissextileYear();
    }
});