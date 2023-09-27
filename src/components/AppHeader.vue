<template>
    <header>

        <!-- navbar -->
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <!-- logo -->
                <RouterLink class="navbar-brand" :to="{ name: 'home' }">
                    <img class="img-fluid" id="logo" src="../../public/logo.png" alt="logo">
                </RouterLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <!-- left side -->
                    <ul class="navbar-nav">

                        <!-- home -->
                        <li class="nav-item">
                            <RouterLink class="nav-link active" aria-current="page" :to="{ name: 'home' }">Home
                            </RouterLink>
                        </li>
                        <!-- create -->
                        <li class="nav-item">
                            <RouterLink class="nav-link active" aria-current="page" :to="{ name: 'apartments.create' }">
                                Create
                            </RouterLink>
                        </li>


                    </ul>

                    <!-- right side -->
                    <ul class="navbar-nav">
                        <!-- login -->
                        <li class="nav-item">
                            <RouterLink class="nav-link active" aria-current="page" :to="{ name: 'login' }">Login
                            </RouterLink>
                        </li>


                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped>
#logo {
    max-width: 80px;
    border-radius: 50%;
}
</style>