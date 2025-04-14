<template>
    <div class="d-flex flex-column justify-content-center align-items-center container-pages">
        <div class="container d-flex justify-content-center align-items-center">
            <logo class="logo"/>
        </div>
        <div>
            <FormUnirseSala class=""/>
            <BtnSalirLobby class="w-100 "/>
        </div>
    </div>
</template>
<script>
import logo from '@/components/logo.vue';
import FormUnirseSala from '@/components/FormUnirseSala.vue';
import BtnSalirLobby from '@/components/CreateGame/BtnSalirLobby.vue';

export default {
    components: {
        logo,
        FormUnirseSala,
        BtnSalirLobby,
    }
}
</script>

<style>
.container-pages {
    height: 100vh;
    width: 100vw;
    background-color: #12122b;
}
.logo{
    width: 200px;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
}
</style>