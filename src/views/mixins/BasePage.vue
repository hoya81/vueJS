<template>
  <transition v-on:enter="enter" v-on:leave="leave">
    <section class="content">
      <div class="bg">123123</div>
      <slot name="content"></slot>
    </section>
  </transition>
</template>
