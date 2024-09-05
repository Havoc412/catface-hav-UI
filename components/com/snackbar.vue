<template>
    <div v-show="show" 
        class="snackbar-container flex-horizontal" 
        :style="{ backgroundColor: setBackgroundColor,
                color: color ? '#333' : '#fff' }"
        :class="{'snackbar-container-leave': leave_flag}">
        <p>{{ message }}</p>
        <div class="spacer"/>
        <fr-icon-error theme="filled" :size="30" :fill="[color ? '#333' : '#fff']" @click="close"/>
    </div>
</template>

<script>
export default {
    name: 'm-snackbar',
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: Boolean,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        color: {
            type: [Number, Boolean], // 向上兼容
            // required: true
        },
        timeout: {
            type: Number,
            default: 2000
        },
    },
    data() {
        return {
            show: false,
            leave_flag: false,
        }
    },
    computed: {
        setBackgroundColor() {
            let color;
            if(typeof this.color == 'boolean')
                color = this.color ? 1: 0;
            else
                color = this.color;
            switch(color) {
                case 0: return '#ff4c55';
                case 1: return '#C7F6AA';
                case 2: return '#FFFD92';
            }
        }
    },
    methods: {
        closeSelf(TIMEOUT = 1000) {
            setTimeout(() => {
                this.leave_flag = true;
                setTimeout(() => {
                    this.show = false;
                    this.leave_flag = false;
                    this.$emit('update:modelValue', false);
                }, 500);
            }, TIMEOUT);
        },
        close() {
            this.show = false;
        }
    },
    watch: {
        modelValue(newValue, oldValue) {
            if(newValue == true) {
                this.show = true;
                this.closeSelf(this.timeout);
            }
        }
    },
    // mounted() {
    //     this.show = true;
    //     this.closeSelf(this.timeout);
    // },
}

</script>

<style>

.snackbar-container {
    position: fixed;
    top: 40rpx;
    left: 50%;
    /* bottom: 20px; */
    transform: translateX(-50%);

    width: 80%;
    max-width: 400px;
    border-radius: 5px;
    padding: 7px;

    /* 动画部分 */
    animation: enter 0.5s;
    transition: opacity 0.5s;

    z-index: 9999;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, .3);
}

.snackbar-container p {
    font-size: 14px;
    font-weight: 600;
}

/* 定义渐入渐出动画效果 */
@keyframes enter {
    0% {
        opacity: 0;
    }
    20% {
        opacity: 0.5;   
    }
    100% {
        opacity: 1;
    }
}

.snackbar-container-leave {
    opacity: 0;
}

</style>