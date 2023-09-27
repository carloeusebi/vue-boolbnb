<script>
import AppHeader from './components/AppHeader.vue';

export default {
	components: { AppHeader },
};
</script>

<template>
	<!-- header -->
	<AppHeader />

	<!-- main -->
	<div>
		<RouterView></RouterView>
	</div>
</template>

<style scoped></style>
