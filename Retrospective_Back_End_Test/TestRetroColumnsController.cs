using Moq;
using Retrospective_Back_End.Controllers;
using Retrospective_Core.Models;
using Retrospective_Core.Services;
using Retrospective_EFSQLRetrospectiveDbImpl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace Retrospective_Back_End_Test {
    public class TestRetroColumnsController {

        Mock<IRetroRespectiveRepository> mockRetrospectiveRepo;
        IList<RetroColumn> retroColumns;
   
        public TestRetroColumnsController() {
            this.mockRetrospectiveRepo = new Mock<IRetroRespectiveRepository>();
            this.retroColumns = new List<RetroColumn>() {
                 new RetroColumn {
                    Title = "Column 1",
                    Id = 0
                },
                 new RetroColumn {
                    Title = "Column 2",
                    Id = 1
                }
            };
    
        }

        [Fact]
        public void AdditionOfAColumn() {
            //Arrange
            IRetroRespectiveRepository repo = mockRetrospectiveRepo.Object;
            var controller = new RetroColumnsController(repo);

            IList<RetroColumn> columns = new List<RetroColumn>();

            Action<RetroColumn> action = (RetroColumn) => {
                columns.Add(RetroColumn);
            };

            mockRetrospectiveRepo.Setup(m => m.SaveRetroColumn(It.IsAny<RetroColumn>())).Callback(action);

            //Act
            controller.PostRetroColumn(new RetroColumn {
                Id = 2,
                Title = "Column 3"
            });

            //Assert
            Assert.True(columns.Count() > 0);

            RetroColumn createdColumn = columns.FirstOrDefault(r => r.Title.Equals("Column 3"));

            Assert.NotNull(createdColumn);
        }

        [Fact]
        public void DeletionOfAColumn() {
            //Arrange
            RetroColumn column = new RetroColumn {
                Id = 0,
                Title = "Column 1"
            };

            IList<RetroColumn> columns = new List<RetroColumn> {
                column
            };

            Action<RetroColumn> action = (RetroColumn) => {
                columns.Remove(RetroColumn);
            };


            mockRetrospectiveRepo.Setup(m => m.RetroColumns).Returns(columns.AsQueryable());
            mockRetrospectiveRepo.Setup(m => m.RemoveRetroColumn(It.IsAny<RetroColumn>())).Callback(action);

            IRetroRespectiveRepository repo = mockRetrospectiveRepo.Object;
            var controller = new RetroColumnsController(repo);

            //Act
            controller.DeleteRetroColumn(0);

            //Assert
            Assert.True(columns.Count() == 0);
        }
    }
}
