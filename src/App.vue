
<script setup>
import { ref, onMounted } from 'vue'

const projects = ref([])
const loading = ref(true)
const errorMessage = ref('')

const skills = [
  'HTML & CSS',
  'JavaScript',
  'Vue.js',
  'Node.js',
  'PostgreSQL',
  'Arduino',
  'Computer Hardware',
  'Git & Git Bash'
]

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/api/projects')

    if (!response.ok) {
      throw new Error('Could not load projects')
    }

    projects.value = await response.json()
  } catch (error) {
    errorMessage.value =
        'Unable to load projects. Please start the backend.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#F7F0E5] text-[#292522]">

    <!-- Navigation -->
    <header class="border-b border-[#dfd2c2]">
      <nav
          class="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"
      >
        <a href="#home" class="text-xl font-black tracking-tight">
          YT<span class="text-[#8B1E2D]">.</span>
        </a>

        <div class="flex gap-4 text-sm font-medium sm:gap-7">
          <a href="#about" class="hover:text-[#8B1E2D]">About</a>
          <a href="#skills" class="hover:text-[#8B1E2D]">Skills</a>
          <a href="#projects" class="hover:text-[#8B1E2D]">Projects</a>
          <a href="#contact" class="hover:text-[#8B1E2D]">Contact</a>
        </div>
      </nav>
    </header>

    <main>
      <!-- Home -->
      <section
          id="home"
          class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28"
      >
        <div>
          <p
              class="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[#8B1E2D]"
          >
            Computer Engineering Student
          </p>

          <h1 class="text-5xl font-black leading-tight sm:text-7xl">
            Hi, I'm <span class="text-[#8B1E2D]">Yvan.</span>
          </h1>

          <p class="mt-6 max-w-lg text-lg leading-8 text-[#665B53]">
            I enjoy learning about technology, building useful projects,
            and turning simple ideas into working solutions.
          </p>

          <div class="mt-8 flex flex-wrap gap-4">
            <a
                href="#projects"
                class="rounded-md bg-[#8B1E2D] px-6 py-3 font-semibold text-white transition hover:bg-[#6F1724]"
            >
              Explore My Projects →
            </a>

            <a
                href="#contact"
                class="rounded-md border border-[#8B1E2D] px-6 py-3 font-semibold text-[#8B1E2D] hover:bg-[#8B1E2D] hover:text-white"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div class="flex justify-center md:justify-end">
          <div
              class="flex h-72 w-72 items-center justify-center rounded-2xl bg-[#8B1E2D] shadow-xl sm:h-80 sm:w-80"
          >
            <div class="flex justify-center md:justify-end">
              <div
                  class="h-72 w-72 overflow-hidden rounded-2xl border-4 border-[#8B1E2D] bg-[#EEE3D4] shadow-xl sm:h-80 sm:w-80"
              >
                <img
                    src="/id.jpg"
                    alt="My profile photo"
                    class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About -->
      <section id="about" class="bg-white/50">
        <div class="mx-auto max-w-6xl px-6 py-16">
          <p
              class="text-sm font-bold uppercase tracking-[0.2em] text-[#8B1E2D]"
          >
            A Little About Me
          </p>

          <h2 class="mt-3 text-3xl font-black sm:text-4xl">
            Learning by building.
          </h2>

          <p class="mt-6 max-w-3xl leading-8 text-[#665B53]">
            I'm a Computer Engineering student interested in software
            development, embedded systems, and creative technology.
            I use my projects to improve my programming skills and
            understand how hardware and software work together.
          </p>
        </div>
      </section>

      <!-- Skills -->
      <section id="skills" class="mx-auto max-w-6xl px-6 py-16">
        <p
            class="text-sm font-bold uppercase tracking-[0.2em] text-[#8B1E2D]"
        >
          What I Work With
        </p>

        <h2 class="mt-3 text-3xl font-black sm:text-4xl">
          My Skills
        </h2>

        <div class="mt-8 flex flex-wrap gap-3">
          <span
              v-for="skill in skills"
              :key="skill"
              class="rounded-md border border-[#dfd2c2] bg-white px-4 py-3 text-sm font-medium"
          >
            {{ skill }}
          </span>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="bg-[#EEE3D4]">
        <div class="mx-auto max-w-6xl px-6 py-16">
          <p
              class="text-sm font-bold uppercase tracking-[0.2em] text-[#8B1E2D]"
          >
            My Work
          </p>

          <h2 class="mt-3 text-3xl font-black sm:text-4xl">
            Featured Projects
          </h2>

          <p class="mt-3 text-[#665B53]">
            A few projects I've worked on and learned from.
          </p>

          <p v-if="loading" class="mt-8">
            Loading projects...
          </p>

          <p
              v-else-if="errorMessage"
              class="mt-8 rounded-md border border-red-200 bg-white p-4 text-[#8B1E2D]"
          >
            {{ errorMessage }}
          </p>

          <div
              v-else-if="projects.length === 0"
              class="mt-8 rounded-md bg-white p-6"
          >
            No projects yet. Add some projects to your database.
          </div>

          <div
              v-else
              class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <article
                v-for="project in projects"
                :key="project.id"
                class="flex flex-col rounded-xl border border-[#dfd2c2] bg-[#FDFBF7] p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                  class="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#8B1E2D] text-xl font-black text-white"
              >
                {{ project.title.charAt(0) }}
              </div>

              <h3 class="text-xl font-bold">
                {{ project.title }}
              </h3>

              <p class="mt-3 flex-1 leading-7 text-[#665B53]">
                {{ project.description }}
              </p>

              <p class="mt-5 text-sm font-semibold text-[#8B1E2D]">
                {{ project.technologies }}
              </p>

              <a
                  v-if="project.project_link"
                  :href="project.project_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-5 inline-block font-semibold text-[#8B1E2D] hover:underline"
              >
                View Project →
              </a>
            </article>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="mx-auto max-w-6xl px-6 py-20">
        <p
            class="text-sm font-bold uppercase tracking-[0.2em] text-[#8B1E2D]"
        >
          Get In Touch
        </p>

        <h2 class="mt-3 text-3xl font-black sm:text-4xl">
          Let's connect.
        </h2>

        <p class="mt-5 max-w-xl leading-8 text-[#665B53]">
          I'm always open to learning, collaborating, and discussing
          ideas about technology and software development.
        </p>

        <a
            href="mailto:your-email@example.com"
            class="mt-7 inline-block rounded-md bg-[#8B1E2D] px-6 py-3 font-semibold text-white hover:bg-[#6F1724]"
        >
          Send Me an Email
        </a>

        <p class="mt-5 text-sm text-[#665B53]">
          Replace the sample email address with your own.
        </p>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-[#dfd2c2] px-6 py-6 text-center text-sm text-[#665B53]">
      Made with care by Yvan · My Portfolio
    </footer>
  </div>
</template>
