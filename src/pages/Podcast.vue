<template>
	<!-- div for searching podcast -->
	<div class="podcast-container">
		<Loader v-show="loading" />
		<b-container class="bv-example-row">
			<b-row>
				<b-col md="4">
					<b-row>
						<b-col md="12" class="podcast-basic-info">
							<Podcast-basic-info
								v-if="selectedPodcast"
								:podcast="selectedPodcast"
								class="podcast-card"
							/>
						</b-col>
					</b-row>
				</b-col>
				<b-col md="8">
					<b-row>
						<b-col md="12">
							<Podcast-events
								:upcoming-events="upcomingEvents"
								:past-events="pastEvents"
								class="section"
							/>
						</b-col>
						<b-col md="12">
							<h1>Users</h1>

							<PodcastCard
								v-if="selectedPodcast"
								:podcast="selectedPodcast.name"
								user-group="Developers"
								:users="developersFromPodcast"
							/>
						</b-col>
						<b-col md="12" class="section">
							<PodcastCard
								v-if="selectedPodcast"
								:podcast="selectedPodcast.name"
								user-group="Designers"
								:users="designersFromPodcast"
							/>
						</b-col>
					</b-row>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import PodcastCard from '@/components/Podcast/PodcastCard';
import PodcastService from '@/services/Podcast.service';

export default {
	components: {
		PodcastCard,
	},
	data() {
		return {
			selectedPodcast: null,
			developersFromPodcast: [],
			designersFromPodcast: [],
			upcomingEvents: [],
			pastEvents: [],
			loading: true,
		};
	},
	created() {
		const PodcastName = this.$route.params.PodcastName;
		const countryCode = this.$route.params.countryCode;
		this.loading = true;
		PodcastService.getPodcastDetails(PodcastName, countryCode).then(
			(podcast) => {
				this.selectedPodcast = podcast;
				this.loading = false;
			}
		);

		PodcastService.getUsersFromPodcast(PodcastName, countryCode).then(
			(users) => {
				this.developersFromPodcast = users.filter((u) => u.category === 'dev');
				this.designersFromPodcast = users.filter(
					(u) => u.category === 'designer'
				);
			}
		);

		PodcastService.getEventsInPodcast(PodcastName, countryCode).then(
			(PodcastEvents) => {
				this.upcomingEvents = PodcastEvents.filter(
					(e) => new Date(e.dateFrom) > new Date()
				);
				this.pastEvents = PodcastEvents.filter(
					(e) => new Date(e.dateFrom) < new Date()
				).sort((e1, e2) => new Date(e2.dateFrom) - new Date(e1.dateFrom));
			}
		);
	},
	methods: {},
};
</script>

<style scoped lang="scss">
/* style for podcast search page */
.podcast-container {
	text-align: left;
}

.podcast-card {
	margin: 0.5rem 0 1rem 0;
	display: inline-block;
}

.inputPodcastDiv {
	border: 3px solid #114273;
	display: inline-block;
	margin: 0 auto;
	width: 25%;
}
::-webkit-input-placeholder {
	/* Chrome/Opera/Safari */
	color: #114273;
}

.podcast-basic-info {
	text-align: center;
}

.section {
	margin-bottom: 50px;
}
</style>
