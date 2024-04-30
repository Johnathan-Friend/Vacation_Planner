<template>
  <div>
      <h1>Tour Plan</h1>
      <div v-html="gettingDays"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const gettingDays = computed(() => {
  const tourPlan = `
  <h1>Day 1</h1>
  <p>Start your Barcelona exploration by visiting the iconic Sagrada Familia, designed by Antoni Gaudí. Enjoy a leisurely stroll down the famous Las Ramblas street, and then head to the Gothic Quarter for a taste of Barcelona's history and architecture.</p>

  <h1>Day 2</h1>
  <p>Explore Park Güell, another masterpiece designed by Gaudí, and take in the stunning views of the city. Visit the charming neighborhood of Gràcia for its bohemian vibe and local shops. End the day with a visit to the Barcelona Cathedral.</p>

  <h1>Day 3</h1>
  <p>Discover the magic of Montjuïc Hill, home to the National Art Museum of Catalonia and the Magic Fountain. Explore the vibrant neighborhood of El Raval and enjoy some tapas at a local bar.</p>

  <h1>Day 4</h1>
  <p>Take a trip to the picturesque seaside village of Sitges for a relaxing day by the beach. Enjoy the Mediterranean views and explore the town's charming streets and cafes. Return to Barcelona in the evening for a delicious seafood dinner.</p>

  <h1>Day 5</h1>
  <p>Visit the Picasso Museum to admire the works of the legendary artist. Explore the trendy neighborhood of El Born and shop for unique souvenirs. End your Barcelona adventure with a sunset walk along Barceloneta Beach.</p>
`
  const content = tourPlan
  const days = content.split('<h1>') // Split the content by <h1>
  let paragraphs = [] // Array to store paragraphs

  days.forEach((day, index) => {
    if (index !== 0) { // Skip the first empty string
      const [dayDescription] = day.split('</h1>') // Ignore dayTitle
      const paragraphsInDay = dayDescription.split('<p>').map(p => p.replace('</p>', '').trim()).filter(p => p) // Extract and clean paragraphs
      paragraphs = [...paragraphs, ...paragraphsInDay] // Append to paragraphs array
    }

    console.log(paragraphs)
  })
  return paragraphs
})
</script>

<style>
/* Add any custom styles here */
</style>
