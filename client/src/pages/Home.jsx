import React from 'react'
import yard from '../images/yard.JPG'
import banImg from '../images/hyp.JPG'
import comm from '../images/bluehyp.JPG'
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation,Pagination, Autoplay } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

SwiperCore.use([Navigation,Pagination,Autoplay]);

export default function Home() {
	return (
		<div>
			<div className="slide">
				<Swiper
					className="banner"
					spaceBetween={50}
					slidesPreview={3}
					navigation
					pagination={{clickable:true}}
					autoplay={{delay:3000}}
					breakpoints={{
						768: {
							slidesPreview: 7,
						},
					}}
				>
					<SwiperSlide>
						<div className="bannerImg">
							<img src={banImg} className="bnnImg"/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="bannerImg">
							<p>dd</p>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="bannerImg">
							<p>dd</p>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="bannerImg">
							<p>dd</p>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className="bannerImg">
							<p>dd</p>
						</div>
					</SwiperSlide>	
				</Swiper>
			</div>
			<div className="hotText">
				<h1>Hot Planet</h1>
			</div>
			<div className="hotList">
				<div className="bigList">
					<div className="hotImg">
						<a href="#"><img src={banImg} className="bigOne"/></a>
						<div className="imgText">
							<p className="big-text"><a href="#">힙노타이즈 6</a></p>
							<p className="big-text-al"><a href="#">홍대 어딘가dddddddddddddddddddddddddddddddddddddddddd</a></p>
						</div>
					</div>
				</div>
				<div className="smallList">
					<div className="hotImg imgCenter">
						<img src={yard} className="smallIMG"/>
					</div>
				</div>
				<div className="smallList">
					<div className="hotImg imgCenter">
						<img src={yard} className="smallIMG"/>
					</div>
				</div>
				<div className="smallList listRow">
					<div className="hotImg imgCenter">
					</div>
				</div>
				<div className="smallList listRow">
					<div className="hotImg imgCenter">
					</div>
				</div>
			</div>
			<div className="newText">
				<h1>Comming Soon</h1>
			</div>
			<div className="newPlanet">
				<div className="newList">
					<div className="hotImg imgCenter">
						<img src={comm} className="smallIMG"/>
					</div>
				</div>
				<div className="newList">
					<div className="hotImg imgCenter">
					</div>
				</div>
				<div className="newList">
					<div className="hotImg imgCenter">
					</div>
				</div>
			</div>
			<div className="caText">
				<h1>Category</h1>
			</div>
			<div className="caPlanet">
				<div className="newList">
					<div className="hotImg">
					</div>
				</div>
				<div className="newList">
					<div className="hotImg">
					</div>
				</div>
				<div className="newList">
					<div className="hotImg">
					</div>
				</div>
			</div>
		</div>
	)
}
