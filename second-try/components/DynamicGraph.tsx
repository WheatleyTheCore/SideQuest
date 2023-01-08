import React from 'react'
import { Dimensions, Text } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

  export default ({chartType, entries, dependentVar, independentVar}) =>  {

      const graphWidth = Dimensions.get("window").width - 50
      const chartConfig={
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }

      switch(chartType){
        case 'contribution':
            let dates: any[] = []
            entries.map((entry: any) => {
            let entryDateObject = dates.find(dateObj => {
                let dateObjDate = new Date(dateObj.date).toDateString()
                let entryObjDate = new Date(entry.datetime_of_initial_submit).toDateString()
                console.log(`${entryObjDate}: ${dateObjDate == entryObjDate}`)
                if (dateObjDate == entryObjDate) return dateObjDate
              })

              if (entryDateObject) {
                dates[dates.indexOf(entryDateObject)].count += 1;
              } else {
                let entryObect = {}
                entryObect.date = entry.datetime_of_initial_submit
                entryObect.count = 1
                dates.push(entryObect)
              }
            })

            return (
              <ContributionGraph
                values={dates}
                endDate={new Date()}
                numDays={105}
                width={graphWidth}
                height={220}
                chartConfig={chartConfig}
                onDayPress={val => console.log(val)}
                />
            )
        case 'line': 
          if (dependentVar == -1) return <Text>Choose a dependent variable</Text>
          if (independentVar == -1) return <Text>Choose an independent variable</Text>
          if (dependentVar == independentVar) return <Text>Dependent variable and independent variable cannot be the same</Text>

          let dataObject = {}
          let bothValuesAreNumbers = true;

          //if both are numbers then sort them as such
          entries.map((entry: any) => {
            if ((isNaN(entry[dependentVar])) || (!isNaN(entry[independentVar]))) bothValuesAreNumbers = false;
            if (independentVar in entry) dataObject[entry[independentVar]] = entry[dependentVar]
          })



          if (bothValuesAreNumbers) {
            const orderedData = Object.keys(dataObject).sort().reduce(
              (obj, key) => { 
                if (independentVar == 'datetime_of_initial_submit') {
                  let date = new Date(key)
                  let parsedDate = date.toString()
                  obj[parsedDate] = dataObject[key]
                } else {
                  obj[key] = dataObject[key]; 
                }
                
                return obj;
              }, 
              {}
            );

            dataObject = orderedData;
          }

          console.log("DATA OBJECT")
          console.log(dataObject)
          // if (independentVar == 'datetime_of_initial_submit') {
          //   const orderedData = Object.keys(dataObject).sort((a, b) => {
          //     return d
          //   }).reduce(
          //     (obj, key) => { 
          //       obj[key] = dataObject[key]; 
          //       return obj;
          //     }, 
          //     {}
          //   );

          //   dataObject = orderedData;
          // }
          

          const labels = Object.keys(dataObject)
          let data = []
          for (const label in dataObject) {
            data.push(parseInt(dataObject[label]))
          }

          console.log(`Labels: ${labels}`)
          console.log(`data: ${typeof data[0]}`)

          return (

              <LineChart
              data={{
                labels: labels,
                datasets: [
                  {
                    data: data
                  }
                ]
              }}
              width={graphWidth} // from react-native
              height={220}
              chartConfig={chartConfig}
            />
          )
        case 'bar':
          if (independentVar == -1) return <Text>Choose an independent variable</Text>


          let barData = entries.reduce((dataArray, currentEntry) => {
            console.log(currentEntry)
            let currentEntryInDataArray = dataArray.find(element => element.name == currentEntry[independentVar])
            if (currentEntryInDataArray) {
              dataArray[dataArray.indexOf(currentEntryInDataArray)].occurences += 1
            } else {
              dataArray.push({
                name: currentEntry[independentVar],
                occurences: 1
              })
            }
            return dataArray
          }, [])

          let barLabels = []
          let barOccurences = []

          barData.forEach(element => {
            barLabels.push(element.name)
            barOccurences.push(element.occurences)
          });

          let barGraphInputData = {
            labels: barLabels,
            datasets: [
              {
                data: barOccurences
              }
            ]
          };
          return (
            <BarChart
            data={barGraphInputData}
            width={graphWidth}
            height={220}
            chartConfig={chartConfig}
            fromZero={true}
          />
          )
          
        case 'pie':
          if (independentVar == -1) return <Text>Choose an independent variable</Text>

          const colorList = ['#12BDC9', '#FC1EA5', '#39EDFA', '#FADC20', '#AD9A1F', '#468FFA', '#3128FA', '#FA7C34', '#FAD102']

          const generateColor  = (pieDataLen) => {
            let index = pieDataLen;
            while (index > colorList.length) {
              index -= colorList.length
            }

            return colorList[index]
          }

          let piedata = entries.reduce((dataArray, currentEntry) => {
            console.log(currentEntry)
            let currentEntryInDataArray = dataArray.find(element => element.name == currentEntry[independentVar])
            if (currentEntryInDataArray) {
              dataArray[dataArray.indexOf(currentEntryInDataArray)].occurences += 1
            } else {
              dataArray.push({
                name: currentEntry[independentVar],
                occurences: 1,
                color: generateColor(dataArray.length),
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
              })
            }
            return dataArray
          }, [])

            return (
              <PieChart
                data={piedata}
                width={graphWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"occurences"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 50]}
                absolute
              />
            )

        


      }

    return (
        <Text>Whoops! Something went wrong.</Text>
    )
}