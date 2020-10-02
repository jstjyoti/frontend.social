<template>
	<!-- div for searching podcasts -->
	<div
		v-infinite-scroll="loadPodcasts"
		class="learn"
		infinite-scroll-disabled="isDisableInfiniteScroll"
		infinite-scroll-distance="limit"
	>
		<Loader v-show="loading" />
		<b-container>
			<b-row>
				<b-col md="12">
					<div class="search-box-container">
						<input
							class="search-box"
							placeholder="Serach topic"
							@input="podcastSearch"
						/>
					</div>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="12">
					<div
						v-if="podcasts == null || podcasts.length === 0"
						class="no-result"
					>
						No Podcast found. Please try again..
					</div>
				</b-col>
			</b-row>
			<b-row>
				<b-col v-for="(podcast, index) in podcasts" :key="index" md="3">
					<div class="podcast-card-container">
						<podcast-thumbnail :="podcast" class="podcast-card" />
					</div>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import PodcastThumbnail from '@/components/Podcast/PodcastThumbnail';
import podcastService from '@/services/podcast.service';
import { uniqBy } from 'lodash';
export default {
	components: {
		PodcastThumbnail,
	},
	props: {
		infiniteScroll: {
			type: Boolean,
			default: true,
		},
		limit: {
			type: Number,
			default: 10,
		},
	},
	data() {
		return {
			cities: [],
			loading: false,
		};
	},
	computed: {
		isDisableInfiniteScroll() {
			return !this.infiniteScroll || this.busy;
		},
	},
	created() {
		if (!this.infiniteScroll) {
			this.loadCities();
		}
	},
	methods: {
		PodcastSearch(e) {
			// Podcast SEARCH
			const PodcastSearchText = e.target.value
				.replace(/^\s+/, '')
				.replace(/\s+$/, '');

			this.loadCities(PodcastSearchText);
		},
		loadCities(searchText) {
			if (searchText) {
				this.page = 1;
			}

			this.busy = false;
			this.limit = this.limit || 10;
			this.page = this.page || 1;

			PodcastService.getCities(searchText, '', this.limit, this.page).then(
				(cities) => {
					if (!this.infiniteScroll || searchText) {
						this.cities = cities;
					} else {
						this.cities = this.cities.concat(cities);
						this.cities = uniqBy(this.cities, (x) => x._id);
						this.cities = _.orderBy(this.cities, ['name'], ['asc']);

						if (cities.length > 0) {
							++this.page;
						}
					}
					this.busy = true;
				}
			);
		},
	},
};
</script>

<style scoped lang="scss">
.thumbnail-container {
	display: flex;
	flex-wrap: wrap;
	flex-grow: unset;
	flex-shrink: unset;
	flex-direction: row;
}

.Podcast-card {
	margin-bottom: 1rem;
	display: inline-block;
}

.Podcast-card-container {
	width: 100%;
	text-align: center;
}

.search-box-container {
	width: 100%;
	text-align: center;
}

.search-box {
	border: 3px solid #114273;
	display: inline-block;
	margin: 20px auto;
	width: 15rem;
	font-size: inherit;
	line-height: inherit;
	height: 1.5rem;
}
::-webkit-input-placeholder {
	/* Chrome/Opera/Safari */
	color: #114273;
}

.no-result {
	text-align: center;
	width: 100%;
}
</style>
