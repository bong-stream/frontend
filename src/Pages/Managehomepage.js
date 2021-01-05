import React, { useState, useEffect } from "react";
import {
  getTrending,
  editTrending,
  getPopular,
  editPopular,
  getBongplaylist,
  editBongplaylist,
  getRecommended,
  editRecommended,
  getTopalbums,
  editTopalbums,
  getTopartists,
  editTopartists,
  getTopcharts,
  editTopcharts,
} from "../Pagesactions/songsactions";
import "../Styles/adminpages.css";
import "../Styles/adminhome.css";
import Active from "../Components/Active";

const Managehomepage = () => {
  const [activeTrending, setActiveTrending] = useState(true);
  const [activePopular, setActivePopular] = useState(true);
  const [activeBongplaylist, setActiveBongplaylist] = useState(true);
  const [activeRecommended, setActiveRecommended] = useState(true);
  const [activeTopalbums, setActiveTopalbums] = useState(true);
  const [activeTopartists, setActiveTopartists] = useState(true);
  const [activeTopcharts, setActiveTopcharts] = useState(true);
  const [fetchDone, setFetchDone] = useState(false);
  const [trending, setTrending] = useState();
  const [popular, setPopular] = useState();
  const [bongplaylist, setBongplaylist] = useState();
  const [topalbums, setTopalbums] = useState();
  const [topartists, setTopartists] = useState();
  const [recommended, setRecommended] = useState();
  const [topcharts, setTopcharts] = useState();
  const handleChange = async (active, label) => {
    console.log(active, label);

    if (label === "Trending") {
      await editTrending({ active, trending: trending });
      setActiveTrending(active);
    } else if (label === "Popular") {
      await editPopular({ active, popular: popular });
      setActivePopular(active);
    } else if (label === "Bongplaylist") {
      await editBongplaylist({ active, bongplaylist: bongplaylist });
      setActiveBongplaylist(active);
    } else if (label === "Topalbums") {
      await editTopalbums({ active, topalbums: topalbums });
      setActiveTopalbums(active);
    } else if (label === "Topartists") {
      await editTopartists({ active, topartists: topartists });
      setActiveTopartists(active);
    } else if (label === "Recommended") {
      await editRecommended({ active, recommended: recommended });
      setActiveRecommended(active);
    } else if (label === "Topcharts") {
      await editTopcharts({ active, topcharts: topcharts });
      setActiveTopcharts(active);
    }
  };

  useEffect(() => {
    let trending,
      popular,
      bongplaylist,
      recommended,
      topalbums,
      topartists,
      topcharts;
    const fetch = async () => {
      trending = await getTrending();
      console.log("helo trending", trending);
      setActiveTrending(trending[0].active);
      setTrending(trending[0].trending);
      popular = await getPopular();
      setActivePopular(popular[0].active);
      setPopular(popular[0].popular);
      bongplaylist = await getBongplaylist();
      setActiveBongplaylist(bongplaylist[0].active);
      setBongplaylist(bongplaylist[0].bongplaylist);
      recommended = await getRecommended();
      setActiveRecommended(recommended[0].active);
      setRecommended(recommended[0].recommended);
      topalbums = await getTopalbums();
      setActiveTopalbums(topalbums[0].active);
      setTopalbums(topalbums[0].topalbums);
      topartists = await getTopartists();
      setActiveTopartists(topartists[0].active);
      setTopartists(topartists[0].topartists);
      topcharts = await getTopcharts();
      setActiveTopcharts(topcharts[0].active);
      setTopcharts(topcharts[0].topcharts);
      console.log(topcharts[0].topcharts);
      setFetchDone(true);
      console.log("i am done");
    };
    fetch();
  }, []);
  return (
    <div style={{ overflowX: "hidden" }} className="main">
      <div>
        <h2>Manage Home Page</h2>
      </div>
      <div>
        <div className="row">
          <div className="col-12 col-md-4"></div>
          <div className="col-12 col-md-4">
            <br />
            <br />
            <br />
            <div className="row">
              <div className="col-12">
                {fetchDone ? (
                  <div className="row">
                    <div className="col-12">
                      <Active
                        label="Trending"
                        handleChange={handleChange}
                        active={activeTrending}
                      />
                    </div>
                    <div className="col-12">
                      <Active
                        label="Popular"
                        handleChange={handleChange}
                        active={activePopular}
                      />
                    </div>
                    <div className="col-12">
                      <Active
                        label="Bongplaylist"
                        handleChange={handleChange}
                        active={activeBongplaylist}
                      />
                    </div>
                    <div className="col-12">
                      <Active
                        label="Topalbums"
                        handleChange={handleChange}
                        active={activeTopalbums}
                      />
                    </div>
                    <div className="col-12">
                      <Active
                        label="Topartists"
                        handleChange={handleChange}
                        active={activeTopartists}
                      />
                    </div>
                    <div className="col-12">
                      <Active
                        label="Recommended"
                        handleChange={handleChange}
                        active={activeRecommended}
                      />
                    </div>
                    <div className="col-12">
                      <Active
                        label="Topcharts"
                        handleChange={handleChange}
                        active={activeTopcharts}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Managehomepage;
